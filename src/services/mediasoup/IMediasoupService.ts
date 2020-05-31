import Router from 'entities/Router';
import TransportOptions from '../../entities/TransportOptions';
import ConsumerOptions from '../../entities/ConsumerOptions';
import FindProducerOptions from '../../entities/FindProducerOptions';

export default abstract class IMediasoupService {
  abstract createRouter(roomId: string): Promise<Router>;

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

  abstract findProducerByRoomId(roomId: string): Promise<FindProducerOptions>;

  abstract getRouterCapabilitiesByRoomId(roomId: string): Promise<object>;
}
