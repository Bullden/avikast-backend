import IRoomStore from 'database/stores/room/IRoomStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import RoomModel, {CreateRoomModel, RoomSchema} from 'database/models/RoomModel';
import {RoomType} from 'entities/Room';
import {
  mapParticipantFromModel,
  mapParticipantsFromModel,
  mapRoomFromModel,
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
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
    inviteLink: string;
  }) {
    const newRoom: CreateRoomModel = {
      name: room.name,
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
    const room = await this.roomModel.findOne({user: userId}).populate(this.populateRoom);
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

  async getParticipants(roomId: string) {
    return mapParticipantsFromModel(
      await this.participantModel.find({room: roomId}).populate(this.populateParticipant),
    );
  }

  async getWebinarOwner(userId: string, roomId: string) {
    const webinarOwner = await this.participantModel
      .findOne({room: roomId, user: userId, role: ParticipantRole.Owner})
      .populate(this.populateParticipant);

    if (!webinarOwner || webinarOwner === null) throw new Error('Webinar does not exist');
    return mapParticipantFromModel(webinarOwner);
  }

  async updateParticipantMedia(
    type: 'audio' | 'video' | 'screenShare',
    roomId: string,
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
}
