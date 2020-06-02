import IMediasoupManager from './IMediasoupManager';
import IMediasoupService from 'services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import {MediaAttributes} from 'entities/Mediasoup';

@Injectable()
export default class MediasoupManager extends IMediasoupManager {
  constructor(private readonly mediasoupService: IMediasoupService) {
    super();
  }

  async createTransport(
    userId: string,
    roomId: string,
    mediaAttributes: MediaAttributes,
  ) {
    return this.mediasoupService.createTransport(roomId, mediaAttributes);
  }

  async connectTransport(
    roomId: string,
    dtlsParameters: object,
    mediaAttributes: MediaAttributes,
  ) {
    await this.mediasoupService.connectTransport(roomId, dtlsParameters, mediaAttributes);
  }

  async createProducer(transportId: string, roomId: string, rtpParameters: object) {
    return this.mediasoupService.createProducer(transportId, roomId, rtpParameters);
  }

  async createConsumer(producerId: string, roomId: string, rtpCapabilities: object) {
    return this.mediasoupService.createConsumer(producerId, roomId, rtpCapabilities);
  }

  async getRouter(roomId: string) {
    return this.mediasoupService.getRouter(roomId);
  }

  async findProducer(userId: string, roomId: string) {
    return this.mediasoupService.findProducer(userId, roomId);
  }
}
