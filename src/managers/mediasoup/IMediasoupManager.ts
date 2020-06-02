import {
  ConsumerOptions,
  TransportOptions,
  RouterOptions,
  ProducerOptions,
  MediaAttributes,
} from 'entities/Mediasoup';

export default abstract class IMediasoupManager {
  abstract createTransport(
    userId: string,
    roomId: string,
    mediaAttributes: MediaAttributes,
  ): Promise<TransportOptions>;

  abstract connectTransport(
    roomId: string,
    dtlsParameters: object,
    mediaAttributes: MediaAttributes,
  ): Promise<void>;

  abstract createProducer(
    transportId: string,
    roomId: string,
    rtpParameters: object,
  ): Promise<ProducerOptions>;

  abstract createConsumer(
    producerId: string,
    roomId: string,
    rtpCapabilities: object,
  ): Promise<ConsumerOptions>;

  abstract getRouter(roomId: string): Promise<RouterOptions>;

  abstract findProducer(filter: object): Promise<string>;
}
