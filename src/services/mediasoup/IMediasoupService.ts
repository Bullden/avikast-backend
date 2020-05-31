import {
  ConsumerOptions,
  ProducerOptions,
  RouterOptions,
  TransportOptions,
} from 'entities/Mediasoup';

export default abstract class IMediasoupService {
  abstract createRouter(roomId: string): Promise<RouterOptions>;

  abstract createTransport(roomId: string): Promise<TransportOptions>;

  abstract connectTransport(roomId: string, dtlsParam: object): Promise<void>;

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

  abstract findProducerByRoomId(roomId: string): Promise<ProducerOptions>;

  abstract getRouterCapabilitiesByRoomId(roomId: string): Promise<RouterOptions>;
}
