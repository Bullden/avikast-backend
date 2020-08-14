import {
  ConsumerOptions,
  TransportOptions,
  RouterOptions,
  ProducerOptions,
  Direction,
  MediaKind,
  MediaType,
} from 'entities/Mediasoup';

export default abstract class IMediasoupManager {
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
    mediaKind: MediaKind,
    mediaType: MediaType,
  ): Promise<ProducerOptions>;

  abstract createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
    userId: string,
  ): Promise<ConsumerOptions>;

  abstract getRouter(roomId: string): Promise<RouterOptions>;

  abstract getProducer(userId: string, roomId: string): Promise<ProducerOptions>;

  abstract getProducers(roomId: string): Promise<ProducerOptions[]>;

  abstract startRecording(
    roomId: string,
    userId: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;

  abstract stopRecording(
    userId: string,
    roomId?: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;
}
