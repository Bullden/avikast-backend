/* eslint-disable @typescript-eslint/ban-ts-ignore */
import IRoomStore from 'database/stores/room/IRoomStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import RoomModel, {CreateRoomModel, RoomSchema} from 'database/models/RoomModel';
import {MuteAction, MuteSource, RoomType} from 'entities/Room';
import {
  mapParticipantFromModel,
  mapParticipantsFromModel,
  mapRoomFromModel,
  mapRoomsFromModel,
} from 'database/models/Mappers';
import ParticipantModel, {
  CreateParticipantModel,
  ParticipantSchema,
} from 'database/models/ParticipantModel';
import {
  ParticipantMedia,
  ParticipantRole,
  ParticipantTrackOptions,
} from 'entities/Participant';
import UserModel, {UserSchema} from 'database/models/UserModel';
import {ChangeEvent, ChangeStream} from 'mongodb';
import {Subject} from 'rxjs';
import Room from 'database/entities/Room';
import {PlayingType} from 'entities/Mediasoup';

export default class RoomStore extends IRoomStore {
  constructor(
    @InjectModel(RoomSchema.name)
    private roomModel: Model<RoomModel>,
    @InjectModel(ParticipantSchema.name)
    private participantModel: Model<ParticipantModel>,
    @InjectModel(UserSchema.name)
    private userModel: Model<UserModel>,
  ) {
    super();
  }

  private readonly populateRoom: QueryPopulateOptions = {
    path: 'user',
  };

  private readonly populateParticipant: QueryPopulateOptions[] = [
    {
      path: 'user',
    },
    {
      path: 'room',
      populate: this.populateRoom,
    },
  ];

  async createRoom(room: {
    name: string;
    closed: undefined;
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
    inviteLink: string;
  }) {
    const newRoom: CreateRoomModel = {
      name: room.name,
      closed: room.closed,
      type: room.type,
      user: room.user.id,
      passwordProtected: room.passwordProtected,
      password: room.password,
      inviteLink: room.inviteLink,
    };
    const createdRoom = await this.roomModel.create(newRoom);
    return mapRoomFromModel(await createdRoom.populate(this.populateRoom).execPopulate());
  }

  async findRoomByIdOrThrow(id: string) {
    const room = await this.roomModel.findById(id).populate(this.populateRoom);
    if (!room) throw new Error('Room not found');
    return mapRoomFromModel(room);
  }

  async findRoomByUser(userId: string) {
    const room = await this.roomModel
      .findOne({user: userId, closed: undefined})
      .populate(this.populateRoom);
    return room ? mapRoomFromModel(room) : null;
  }

  async findCodeByRoomId(roomId: string) {
    const inviteLink = await this.roomModel.findById(roomId).populate(this.populateRoom);
    return inviteLink || null;
  }

  async createParticipant(participant: {
    user: {id: string};
    room: {id: string};
    role: ParticipantRole;
    media: ParticipantMedia;
  }) {
    const createParticipant: CreateParticipantModel = {
      room: participant.room.id,
      user: participant.user.id,
      role: participant.role,
      media: participant.media,
      raiseHand: false,
      kicked: false,
      muted: false,
    };
    const createdParticipant = await this.participantModel.create(createParticipant);
    return mapParticipantFromModel(
      await createdParticipant.populate(this.populateParticipant).execPopulate(),
    );
  }

  async findRoomByCode(inviteLink: string) {
    const room = await this.roomModel.findOne({inviteLink}).populate(this.populateRoom);
    return room ? mapRoomFromModel(room) : null;
  }

  async findParticipant(roomId: string, userId: string) {
    const room = await this.participantModel
      .findOne({room: roomId, user: userId})
      .populate(this.populateParticipant);
    return room ? mapParticipantFromModel(room) : undefined;
  }

  // for guard
  async findRoomAsRoomOwnerByUserId(userId: string) {
    const room = await this.roomModel.findOne({user: userId}).populate(this.populateRoom);
    return room ? mapRoomFromModel(room) : null;
  }

  async findRoomAsParticipantByUserId(userId: string) {
    const participant = await this.participantModel
      .findOne({user: userId})
      .populate(this.populateRoom);
    if (!participant) return null;
    return this.findRoomByUser(participant._id);
  }

  // end region

  async getParticipants(roomId: string) {
    return mapParticipantsFromModel(
      await this.participantModel.find({room: roomId}).populate(this.populateParticipant),
    );
  }

  async getRooms() {
    return mapRoomsFromModel(await this.roomModel.find().populate(this.populateRoom));
  }

  async deleteRooms(roomIds: string[]) {
    await this.roomModel.deleteMany({_id: {$in: roomIds}});
  }

  async getParticipantsTracks(roomId: string) {
    const participants = mapParticipantsFromModel(
      await this.participantModel.find({room: roomId}).populate(this.populateParticipant),
    );
    const tracks: ParticipantMedia[] = [];
    participants.forEach((participant) => {
      const track = participant.media;
      tracks.push(track);
    });
    return tracks;
  }

  async getWebinarOwner(userId: string, roomId: string) {
    const webinarOwner = await this.participantModel
      .findOne({room: roomId, user: userId, role: ParticipantRole.Owner})
      .populate(this.populateParticipant);

    if (!webinarOwner || webinarOwner === null) throw new Error('Webinar does not exist');
    return mapParticipantFromModel(webinarOwner);
  }

  async updateEmptyParticipant(roomId: string, clientId: string, userId: string) {
    const participant = await this.findParticipant(roomId, userId);

    const updateObject: Partial<ParticipantModel> = {};
    if (!participant || !participant.media)
      throw new Error('participant or participant.media doesnt exist');
    const mediaUpdate = {
      enabled: false,
      muted: participant.muted,
      clientId,
      userId,
      producerOptions: undefined,
      mediaKind: undefined,
      mediaType: undefined,
    };

    updateObject.media = {
      userName: participant.media.userName,
      audio: mediaUpdate,
      video: mediaUpdate,
      screen: mediaUpdate,
    };
    await this.participantModel.update({room: roomId, user: userId}, updateObject);
  }

  async updateParticipantMedia(
    type: 'audio' | 'video' | 'screenShare',
    roomId: string,
    clientId: string,
    userId: string,
    request: ParticipantTrackOptions,
  ) {
    const participant = await this.findParticipant(roomId, userId);
    const updateObject: Partial<ParticipantModel> = {};
    if (!participant || !participant.media)
      throw new Error('participant or participant.media doesnt exist');
    if (type === 'audio') {
      const {video, screen} = participant.media;
      updateObject.media = {
        userName: participant.user.name,
        audio: request,
        video,
        screen,
      };
    }
    if (type === 'video') {
      const {audio, screen} = participant.media;
      updateObject.media = {
        userName: participant.user.name,
        audio,
        video: request,
        screen,
      };
    }
    if (type === 'screenShare') {
      const {audio, video} = participant.media;
      updateObject.media = {
        userName: participant.user.name,
        audio,
        video,
        screen: request,
      };
    }
    await this.participantModel.update({room: roomId, user: userId}, updateObject);
    return true;
  }

  async getInviteLink(roomId: string) {
    const inviteLink = await this.findCodeByRoomId(roomId);
    if (!inviteLink) throw new Error('Invite Link not found');
    return inviteLink.toString();
  }

  async updateRaiseHand(roomId: string, userId: string, raiseHand: boolean) {
    const updateObject: Partial<ParticipantModel> = {};
    updateObject.raiseHand = raiseHand;
    await this.participantModel.update({room: roomId, user: userId}, {raiseHand});
    return raiseHand;
  }

  async leaveRoom(roomId: string, userId: string) {
    const participants = await this.getParticipants(roomId);
    if (participants.length === 1) {
      await this.closeRoom(roomId);
      return true;
    }
    const updateObject: Partial<RoomModel> = {};
    const newParticipantsSubject = participants.filter(
      (element) => element.user.id !== userId,
    );
    updateObject.participants = newParticipantsSubject;
    await this.roomModel.update({_id: roomId}, updateObject);
    return true;
  }

  async closeRoom(roomId: string) {
    await this.roomModel.update({_id: roomId}, {closed: new Date()});
    return true;
  }

  async createRecordId(roomId: string, recordId: string) {
    await this.roomModel.update({_id: roomId}, {recordingId: recordId});
  }

  //
  private changeStream: ChangeStream | undefined;

  private roomSubject: Subject<Room> | undefined;

  private watchInternal() {
    if (!this.changeStream) {
      const changeRoom = this.roomModel.watch();
      changeRoom.on('change', this.onChangeEventReceived.bind(this));
      this.changeStream = changeRoom;

      const changeStream = this.participantModel.watch();
      changeStream.on('change', this.onChangeEventReceived.bind(this));
      this.changeStream = changeStream;
    }
    let room: Subject<Room>;
    if (this.roomSubject) {
      room = this.roomSubject;
    } else {
      room = new Subject<Room>();
      this.roomSubject = room;
    }

    return room;
  }

  private async onChangeEventReceived(doc: ChangeEvent) {
    if (doc.operationType === 'insert') {
      // @ts-ignore
      const room = await this.findRoomByIdOrThrow(doc.fullDocument._id);
      if (!room) {
        throw new Error('Message does not exist');
      }
      if (this.roomSubject !== undefined) {
        this.roomSubject.next(room);
      }
    }
    if (doc.operationType === 'update') {
      const participant = await this.participantModel
        .findOne({_id: doc.documentKey})
        .populate(this.populateRoom);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const room = await this.findRoomByIdOrThrow(participant.room);
      if (!room) {
        throw new Error('participantTracks does not exist');
      }
      if (this.roomSubject !== undefined) {
        this.roomSubject.next(room);
      }
    }
  }

  // endregion

  watchRoom() {
    const room = this.watchInternal();
    return room;
  }
  // endregion

  async kick(roomOwnerUserId: string, userId: string, roomId: string) {
    const participant = await this.findParticipant(roomId, userId);
    const updateObject: Partial<ParticipantModel> = {};
    if (!participant) throw new Error('no participant');
    updateObject.kicked = true;
    await this.participantModel.update({_id: userId, room: roomId}, {updateObject});
    return true;
  }

  async mute(action: MuteAction, source: MuteSource, userId: string, roomId: string) {
    if (source === MuteSource.Audio) {
      return this.muteAudio(action, source, userId, roomId);
    }
    if (source === MuteSource.Video) {
      return this.muteVideo(action, source, userId, roomId);
    }
    if (source === MuteSource.Screen) {
      return this.muteScreen(action, source, userId, roomId);
    }
    return false;
  }

  async muteAll(action: MuteAction, userId: string, roomId: string) {
    const participant = await this.findParticipant(roomId, userId);
    if (!participant) throw new Error('no participant');
    // const updateObject: Partial<ParticipantModel> = {};
    const update = {
      room: participant.room.id,
      user: participant.user.id,
      role: participant.role,
      media: {audio: undefined, video: undefined, screen: undefined},
      raiseHand: false,
      kicked: action === MuteAction.Mute,
      muted: true,
    };
    // updateObject.media = update;
    await this.participantModel.update({_id: userId, room: roomId}, {update});
    return false;
  }

  async muteAudio(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    roomId: string,
  ) {
    const participant = await this.findParticipant(roomId, userId);
    const updateObject: Partial<ParticipantModel> = {};
    if (!participant) throw new Error('now participant');
    const update = {
      userName: participant.user.name,
      audio: {
        enabled: participant.media.audio.enabled,
        muted: action !== MuteAction.Mute,
        clientId: participant.media.audio.clientId,
        userId: participant.media.audio.userId,
        producerOptions: participant.media.audio.producerOptions,
        mediaKind: participant.media.audio.mediaKind,
        mediaType: participant.media.audio.mediaType,
      },
      video: participant.media.video,
      screen: participant.media.screen,
    };
    updateObject.media = update;
    await this.participantModel.update({_id: userId, room: roomId}, {updateObject});
    return true;
  }

  async muteVideo(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    roomId: string,
  ) {
    const participant = await this.findParticipant(roomId, userId);
    const updateObject: Partial<ParticipantModel> = {};
    if (!participant) throw new Error('now participant');
    const update = {
      userName: participant.user.name,
      audio: participant.media.audio,
      video: {
        enabled: participant.media.video.enabled,
        muted: action !== MuteAction.Mute,
        clientId: participant.media.video.clientId,
        userId: participant.media.video.userId,
        producerOptions: participant.media.video.producerOptions,
        mediaKind: participant.media.video.mediaKind,
        mediaType: participant.media.video.mediaType,
      },
      screen: participant.media.screen,
    };
    updateObject.media = update;
    await this.participantModel.update({_id: userId, room: roomId}, {updateObject});
    return true;
  }

  async muteScreen(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    roomId: string,
  ) {
    const participant = await this.findParticipant(roomId, userId);
    const updateObject: Partial<ParticipantModel> = {};
    if (!participant) throw new Error('now participant');
    const update = {
      userName: participant.user.name,
      audio: participant.media.audio,
      video: participant.media.video,
      screen: {
        enabled: participant.media.screen.enabled,
        muted: action !== MuteAction.Mute,
        clientId: participant.media.screen.clientId,
        userId: participant.media.screen.userId,
        producerOptions: participant.media.screen.producerOptions,
        mediaKind: participant.media.screen.mediaKind,
        mediaType: participant.media.screen.mediaType,
      },
    };
    updateObject.media = update;
    await this.participantModel.update({_id: userId, room: roomId}, {updateObject});
    return true;
  }

  async playPauseMedia(
    media: PlayingType,
    status: boolean,
    roomId: string,
    userId: string,
  ) {
    const participant = await this.findParticipant(roomId, userId);
    const updateObject: Partial<ParticipantModel> = {};
    if (!participant) throw new Error('now participant');
    if (media === PlayingType.Audio) {
      updateObject.media = {
        userName: participant.user.name,
        audio: {
          enabled: status,
          muted: participant.media.audio.muted,
          clientId: participant.media.audio.clientId,
          userId: participant.media.audio.userId,
          producerOptions: participant.media.audio.producerOptions,
          mediaKind: participant.media.audio.mediaKind,
          mediaType: participant.media.audio.mediaType,
        },
        video: participant.media.video,
        screen: participant.media.screen,
      };
    }
    if (media === PlayingType.Video) {
      updateObject.media = {
        userName: participant.user.name,
        audio: participant.media.audio,
        video: {
          enabled: status,
          muted: participant.media.video.muted,
          clientId: participant.media.video.clientId,
          userId: participant.media.video.userId,
          producerOptions: participant.media.video.producerOptions,
          mediaKind: participant.media.video.mediaKind,
          mediaType: participant.media.video.mediaType,
        },
        screen: participant.media.screen,
      };
    }
    if (media === PlayingType.Screen) {
      updateObject.media = {
        userName: participant.user.name,
        audio: participant.media.audio,
        video: participant.media.video,
        screen: {
          enabled: status,
          muted: participant.media.screen.muted,
          clientId: participant.media.screen.clientId,
          userId: participant.media.screen.userId,
          producerOptions: participant.media.screen.producerOptions,
          mediaKind: participant.media.screen.mediaKind,
          mediaType: participant.media.screen.mediaType,
        },
      };
    }
    await this.participantModel.update({user: userId, room: roomId}, {updateObject});
  }
}
