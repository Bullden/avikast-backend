import {
  ConsumerOptions,
  Direction,
  MediaKind,
  MediaType,
  ProducerOptions,
  RouterOptions,
  TransportOptions,
} from 'entities/Mediasoup';
import {MuteAction} from 'entities/Room';

export default abstract class IMediasoupService {
  abstract createRouter(roomId: string): Promise<RouterOptions>;

  abstract createTransport(
    roomId: string,
    userId: string,
    direction: Direction,
    clientId: string,
  ): Promise<TransportOptions>;

  abstract connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: Direction,
    clientId: string,
  ): Promise<void>;

  abstract createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    userId: string,
    rtpParameters: object,
    mediaType: MediaType,
    mediaKind: MediaKind,
  ): Promise<ProducerOptions>;

  abstract createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
    userId: string,
  ): Promise<ConsumerOptions>;

  abstract getRouter(roomId: string): Promise<RouterOptions>;

  abstract getProducer(roomId: string, userId: string): Promise<ProducerOptions>;

  abstract getProducers(roomId: string): Promise<ProducerOptions[]>;

  abstract startRecording(
    roomId: string,
    userId: string,
    recordId: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;

  abstract stopRecording(
    roomId: string,
    userId: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;

  abstract leaveRoom(roomId: string, userId: string): Promise<boolean>;

  abstract closeRoom(roomId: string): Promise<boolean>;

  abstract mute(
    action: MuteAction,
    roomId: string,
    userId: string,
    producerId: string,
  ): Promise<boolean>;

  // abstract unMute(roomId: string, userId: string): Promise<boolean>;
}
