import IMediasoupManager from './IMediasoupManager';
import IMediasoupService from 'services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import {Direction, MediaKind, MediaType, RenewParticipantMedia} from 'entities/Mediasoup';
import IRoomStore from 'database/stores/room/IRoomStore';

@Injectable()
export default class MediasoupManager extends IMediasoupManager {
  constructor(
    private readonly mediasoupService: IMediasoupService,
    private readonly roomStore: IRoomStore,
  ) {
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
    mediaKind: MediaKind,
    mediaType: MediaType,
  ) {
    const producer = await this.mediasoupService.createProducer(
      roomId,
      transportId,
      clientId,
      userId,
      rtpParameters,
      mediaType,
      mediaKind,
    );
    const renewParticipantMedia: RenewParticipantMedia = {
      enabled: true,
      clientId,
      options: producer,
      mediaKind,
      mediaType,
    };
    if (mediaKind === 'audio') {
      await this.roomStore.updateParticipantMedia(
        mediaKind,
        roomId,
        userId,
        renewParticipantMedia,
      );
    } else {
      await this.roomStore.updateParticipantMedia(
        mediaType,
        roomId,
        userId,
        renewParticipantMedia,
      );
    }
    return producer;
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
