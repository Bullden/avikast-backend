import {
  ConsumerOptions,
  TransportOptions,
  RouterOptions,
  ProducerOptions,
  Direction,
} from 'entities/Mediasoup';

export default abstract class IMediasoupManager {
  abstract createTransport(
    userId: string,
    clientId: string,
    roomId: string,
    direction: Direction,
  ): Promise<TransportOptions>;

  abstract connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: Direction,
    clientId: string,
  ): Promise<void>;

  abstract createProducer(
    userId: string,
    transportId: string,
    roomId: string,
    rtpParameters: object,
    clientId: string,
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
}
