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

  async createRoom(
    userId: string,
    name: string,
    type: RoomType,
    passwordProtected: boolean,
    password: string | undefined,
  ) {
    const room = mapRoomFromDB(
      await this.roomStore.createRoom({
        name,
        user: {id: userId},
        type,
        passwordProtected,
        password,
      }),
    );
    await this.mediasoupService.createRouter(room.id);
    return room;
  }

  async createTransport(userId: string, roomId: string, direction: 'send' | 'receive') {
    return this.mediasoupService.createTransport(roomId, direction);
  }

  async connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: 'send' | 'receive',
  ) {
    await this.mediasoupService.connectTransport(roomId, dtlsParameters, direction);
  }

  async createProducer(transportId: string, roomId: string, rtpParameters: object) {
    return this.mediasoupService.createProducer(transportId, roomId, rtpParameters);
  }

  async createConsumer(producerId: string, roomId: string, rtpCapabilities: object) {
    return this.mediasoupService.createConsumer(producerId, roomId, rtpCapabilities);
  }

  async getRouterCapabilitiesByRoomId(roomId: string) {
    const response = await this.mediasoupService.getRouterCapabilitiesByRoomId(roomId);
    return response;
  }
}
