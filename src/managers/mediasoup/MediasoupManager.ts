import IMediasoupManager from './IMediasoupManager';
import IMediasoupService from 'services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';

@Injectable()
export default class MediasoupManager extends IMediasoupManager {
  constructor(private readonly mediasoupService: IMediasoupService) {
    super();
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

  async getRouter(roomId: string) {
    return this.mediasoupService.getRouter(roomId);
  }
}
