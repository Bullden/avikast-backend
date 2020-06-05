import {
  ConsumerOptions,
  Direction,
  ProducerOptions,
  RouterOptions,
  TransportOptions,
} from 'entities/Mediasoup';

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
}
