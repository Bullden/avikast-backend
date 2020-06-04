import IMediasoupManager from './IMediasoupManager';
import IMediasoupService from 'services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import {Direction} from 'entities/Mediasoup';

@Injectable()
export default class MediasoupManager extends IMediasoupManager {
  constructor(private readonly mediasoupService: IMediasoupService) {
    super();
  }

  async createTransport(roomId: string, direction: Direction, clientId: string) {
    return this.mediasoupService.createTransport(roomId, direction, clientId);
  }

  async connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: Direction,
    clientId: string,
  ) {
    await this.mediasoupService.connectTransport(
      roomId,
      dtlsParameters,
      direction,
      clientId,
    );
  }

  async createProducer(
    userId: string,
    transportId: string,
    roomId: string,
    rtpParameters: object,
    clientId: string,
  ) {
    return this.mediasoupService.createProducer(
      userId,
      transportId,
      roomId,
      rtpParameters,
      clientId,
    );
  }

  async createConsumer(
    producerId: string,
    roomId: string,
    rtpCapabilities: object,
    clientId: string,
    userId: string,
  ) {
    return this.mediasoupService.createConsumer(
      producerId,
      roomId,
      rtpCapabilities,
      clientId,
      userId,
    );
  }

  async getRouter(roomId: string) {
    return this.mediasoupService.getRouter(roomId);
  }

  async getProducer(userId: string, roomId: string) {
    return this.mediasoupService.getProducer(userId, roomId);
  }

  async getProducers(roomId: string) {
    return this.mediasoupService.getProducers(roomId);
  }
}
