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
    mediaType: MediaType,
    mediaKind: MediaKind,
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
      options: producer,
      mediaKind,
      mediaType,
    };
    // todo REFACTOR
    if (mediaType === 'screen') {
      await this.turnOnOffScreen(roomId, userId, renewParticipantMedia, clientId);
      return producer;
    }
    if (mediaKind === 'audio') {
      await this.turnOnOffAudio(roomId, userId, renewParticipantMedia, clientId);
      return producer;
    }
    if (mediaKind === 'video') {
      await this.turnOnOffVideo(roomId, userId, renewParticipantMedia, clientId);
      return producer;
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
    const producers = await this.mediasoupService.getProducers(roomId);
    return producers;
  }

  async turnOnOffAudio(
    roomId: string,
    userId: string,
    renewParticipantMedia: RenewParticipantMedia,
    clientId: string,
  ) {
    // eslint-disable-next-line no-console
    console.log(clientId);
    return this.roomStore.turnOnOffAudio(roomId, userId, renewParticipantMedia);
  }

  async turnOnOffVideo(
    roomId: string,
    userId: string,
    renewParticipantMedia: RenewParticipantMedia,
    clientId: string,
  ) {
    // eslint-disable-next-line no-console
    console.log(clientId);
    return this.roomStore.turnOnOffVideo(roomId, userId, renewParticipantMedia);
  }

  async turnOnOffScreen(
    roomId: string,
    userId: string,
    renewParticipantMedia: RenewParticipantMedia,
    clientId: string,
  ) {
    // eslint-disable-next-line no-console
    console.log(clientId);
    return this.roomStore.turnOnOffScreen(roomId, userId, renewParticipantMedia);
  }
}
