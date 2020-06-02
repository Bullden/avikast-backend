import IRoomManager from './IRoomManager';
import IMediasoupService from '../../services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import IRoomStore from 'database/stores/room/IRoomStore';
import {RoomType} from 'entities/Room';
import {mapParticipantsFromDB, mapRoomFromDB} from 'database/entities/Mappers';
import {ParticipantRole} from 'entities/Participant';
import {generate as generatePassword} from 'generate-password';

@Injectable()
export default class RoomManager extends IRoomManager {
  constructor(
    private readonly roomStore: IRoomStore,
    private readonly mediasoupService: IMediasoupService,
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
    const code = RoomManager.generateCode();
    const room = mapRoomFromDB(
      await this.roomStore.createRoom({
        name,
        user: {id: userId},
        type,
        passwordProtected,
        password,
        code,
      }),
    );
    await this.roomStore.createParticipant({
      room,
      user: {id: userId},
      role: ParticipantRole.Owner,
    });
    await this.mediasoupService.createRouter(room.id);
    return room;
  }

  async joinRoom(userId: string, code: string, password: string | undefined) {
    const dbRoom = await this.roomStore.findRoomByCode(code);
    if (!dbRoom) throw new Error('Code is not valid');
    // if (dbRoom.user.id === userId) throw new Error('Room creator cannot join his room');
    if (dbRoom.passwordProtected && dbRoom.password !== password)
      throw new Error('Password is not valid');

    const room = mapRoomFromDB(dbRoom);
    const participant = await this.roomStore.findParticipant(room.id, userId);
    if (!participant) {
      await this.roomStore.createParticipant({
        user: {id: userId},
        room,
        role: ParticipantRole.User,
      });
    }

    return room;
  }

  async getRoomById(userId: string, roomId: string) {
    const room = await this.roomStore.findRoomByUser(roomId);
    if (!room) throw new Error('Room is not found');
    return mapRoomFromDB(room);
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
    // todo: make check of room permissions
    return mapParticipantsFromDB(await this.roomStore.getParticipants(roomId));
  }
}
