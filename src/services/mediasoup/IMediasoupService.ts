import {
  ConsumerOptions,
  ProducerOptions,
  RouterOptions,
  TransportOptions,
} from 'entities/Mediasoup';

export default abstract class IMediasoupService {
  abstract createRouter(roomId: string): Promise<RouterOptions>;

  abstract createTransport(
    roomId: string,
    direction: 'send' | 'receive',
  ): Promise<TransportOptions>;

  abstract connectTransport(
    roomId: string,
    dtlsParam: object,
    direction: 'send' | 'receive',
  ): Promise<void>;

  abstract sendTrack(
    transportId: string,
    roomId: string,
    rtpParameters: object,
  ): Promise<string>;

  abstract createConsumer(
    producerId: string,
    roomId: string,
    rtpCapabilities: object,
  ): Promise<ConsumerOptions>;

  abstract getRouterCapabilitiesByRoomId(roomId: string): Promise<RouterOptions>;
}
