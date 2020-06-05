import IMediasoupManager from './IMediasoupManager';
import IMediasoupService from 'services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import {Direction} from 'entities/Mediasoup';

@Injectable()
export default class MediasoupManager extends IMediasoupManager {
  constructor(private readonly mediasoupService: IMediasoupService) {
    super();
  }

  async createTransport(
    roomId: string,
    userId: string,
    direction: Direction,
    clientId: string,
  ) {
    return this.mediasoupService.createTransport(roomId, userId, direction, clientId);
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
    roomId: string,
    transportId: string,
    clientId: string,
    userId: string,
    rtpParameters: object,
  ) {
    return this.mediasoupService.createProducer(
      roomId,
      transportId,
      clientId,
      userId,
      rtpParameters,
    );
  }

  async createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
    userId: string,
  ) {
    return this.mediasoupService.createConsumer(
      roomId,
      producerId,
      rtpCapabilities,
      clientId,
      userId,
    );
  }

  async getRouter(roomId: string) {
    return this.mediasoupService.getRouter(roomId);
  }

  async getProducer(roomId: string, userId: string) {
    return this.mediasoupService.getProducer(roomId, userId);
  }

  async getProducers(roomId: string) {
    return this.mediasoupService.getProducers(roomId);
  }
}
