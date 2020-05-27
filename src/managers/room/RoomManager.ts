import IRoomManager from './IRoomManager';
import IMediasoupService from '../../services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import IRoomStore from 'database/stores/room/IRoomStore';
import {RoomType} from 'entities/Room';
import {mapRoomFromDB} from 'database/entities/Mappers';

@Injectable()
export default class RoomManager extends IRoomManager {
  constructor(
    private readonly roomStore: IRoomStore,
    private readonly mediasoupService: IMediasoupService,
  ) {
    super();
  }

  async createRoom(userId: string, name: string, type: RoomType) {
    const room = await this.roomStore.createRoom({name, user: {id: userId}, type});
    const router = await this.mediasoupService.createRouter();
    return mapRoomFromDB(room, router.rtpCapabilities);
  }

  async createTransport(name: string) {
    const transportOptions = await this.mediasoupService.createTransport(name);
    return transportOptions;
  }
}
