import IRoomManager from './IRoomManager';
import IMediasoupService from '../../services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import IRoomStore from 'database/stores/room/IRoomStore';
import {RoomType} from 'entities/Room';
import {ParticipantMedia, ParticipantRole} from 'entities/Participant';
import {
  mapParticipantFromDB,
  mapParticipantsFromDB,
  mapRoomFromDB,
  mapUserFromDb,
} from 'database/entities/Mappers';
import {generate as generatePassword} from 'generate-password';
import IUserStore from 'database/stores/user/IUserStore';

@Injectable()
export default class RoomManager extends IRoomManager {
  constructor(
    private readonly roomStore: IRoomStore,
    private readonly mediasoupService: IMediasoupService,
    private readonly userStore: IUserStore,
  ) {
    super();
  }

  async createRoom(
    userId: string,
    name: string,
    type: RoomType,
    passwordProtected: boolean,
    password: string | undefined,
  ) {
    const inviteLink = RoomManager.generateCode();
    const userName = await this.userStore.getUserName(userId);
    const room = mapRoomFromDB(
      await this.roomStore.createRoom({
        name,
        user: {id: userId},
        type,
        passwordProtected,
        password,
        inviteLink,
      }),
    );

    await this.roomStore.createParticipant({
      room,
      user: {id: userId},
      role: ParticipantRole.Owner,
      media: {
        userName,
        audio: {
          enabled: false,
          clientId: undefined,
          producerOptions: undefined,
          mediaKind: undefined,
          mediaType: undefined,
        },
        video: {
          enabled: false,
          clientId: undefined,
          producerOptions: undefined,
          mediaKind: undefined,
          mediaType: undefined,
        },
        screen: {
          enabled: false,
          clientId: undefined,
          producerOptions: undefined,
          mediaKind: undefined,
          mediaType: undefined,
        },
      },
    });
    await this.mediasoupService.createRouter(room.id);
    return room;
  }

  async joinRoom(userId: string, inviteLink: string, password: string | undefined) {
    const dbRoom = await this.roomStore.findRoomByCode(inviteLink);
    const userName = await this.userStore.getUserName(userId);
    if (!dbRoom) throw new Error('inviteLink is not valid');
    if (dbRoom.user.id === userId) throw new Error('Room creator cannot join his room');
    if (dbRoom.passwordProtected && dbRoom.password !== password)
      throw new Error('Password is not valid');

    const room = mapRoomFromDB(dbRoom);
    const participant = await this.roomStore.findParticipant(room.id, userId);
    if (!participant) {
      // todo set participant media params from joinRoom popup
      await this.roomStore.createParticipant({
        user: {id: userId},
        room,
        role: ParticipantRole.Participant,
        media: {
          userName,
          audio: {
            enabled: false,
            clientId: undefined,
            producerOptions: undefined,
            mediaKind: undefined,
            mediaType: undefined,
          },
          video: {
            enabled: false,
            clientId: undefined,
            producerOptions: undefined,
            mediaKind: undefined,
            mediaType: undefined,
          },
          screen: {
            enabled: false,
            clientId: undefined,
            producerOptions: undefined,
            mediaKind: undefined,
            mediaType: undefined,
          },
        },
      });
    }

    return room;
  }

  async getRoomById(userId: string, roomId: string) {
    const room = await this.roomStore.findRoomByUser(userId);
    const dbUser = await this.userStore.getUser(userId);
    if (!room || !roomId) throw new Error('Room is not found');
    if (!dbUser) throw new Error('dbUser is not found');
    return {...mapRoomFromDB(room), user: mapUserFromDb(dbUser)};
  }

  private static generateCode() {
    return generatePassword({
      length: 10,
      numbers: true,
      lowercase: true,
      uppercase: false,
    });
  }

  async getParticipants(userId: string, roomId: string) {
    if (!(await this.roomStore.findParticipant(roomId, userId)))
      throw new Error("You don't belong to this room");
    return mapParticipantsFromDB(await this.roomStore.getParticipants(roomId));
  }

  async getParticipantsTracks(userId: string, roomId: string) {
    if (!(await this.roomStore.findParticipant(roomId, userId)))
      throw new Error("You don't belong to this room");
    const participants = mapParticipantsFromDB(
      await this.roomStore.getParticipants(roomId),
    );
    const tracks: ParticipantMedia[] = [];
    participants.forEach((participant) => {
      const track = participant.media;
      tracks.push(track);
    });
    return tracks;
  }

  async getWebinarOwner(userId: string, roomId: string) {
    if (!(await this.roomStore.findParticipant(roomId, userId)))
      throw new Error("You don't belong to this room");
    const webinarOwner = mapParticipantFromDB(
      await this.roomStore.getWebinarOwner(userId, roomId),
    );
    return webinarOwner;
  }

  async getInviteLink(roomId: string) {
    return this.roomStore.getInviteLink(roomId);
  }
}
