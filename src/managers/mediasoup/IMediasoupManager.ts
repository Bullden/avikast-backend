import {
  ConsumerOptions,
  TransportOptions,
  RouterOptions,
  ProducerOptions,
} from 'entities/Mediasoup';

export default abstract class IMediasoupManager {
  abstract createTransport(
    userId: string,
    roomId: string,
    direction: 'send' | 'receive',
  ): Promise<TransportOptions>;

  abstract connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: 'send' | 'receive',
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
}
