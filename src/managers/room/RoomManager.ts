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
    return mapRoomFromDB(
      await this.roomStore.createRoom({
        name,
        user: {id: userId},
        type,
        passwordProtected,
        password,
      }),
    );
  }

  async createTransport(userId: string, roomId: string) {
    return this.mediasoupService.createTransport(roomId);
  }

  async connectTransport(roomId: string, dtlsParameters: object) {
    await this.mediasoupService.connectTransport(roomId, dtlsParameters);
  }

  async sendTrack(transportId: string, roomId: string, rtpParameters: object) {
    return this.mediasoupService.sendTrack(transportId, roomId, rtpParameters);
  }

  async createConsumer(producerId: string, roomId: string, rtpCapabilities: object) {
    return this.mediasoupService.createConsumer(producerId, roomId, rtpCapabilities);
  }

  async findProducerByRoomId(roomId: string) {
    return this.mediasoupService.findProducerByRoomId(roomId);
  }
}
