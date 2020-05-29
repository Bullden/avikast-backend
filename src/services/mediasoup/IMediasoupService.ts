import Router from 'entities/Router';
import TransportOptions from '../../entities/TransportOptions';

export default abstract class IMediasoupService {
  abstract createRouter(roomId: string): Promise<Router>;

  abstract createTransport(roomId: string): Promise<TransportOptions>;

  abstract connectTransport(roomId: string, dtlsParam: object): Promise<void>;

  abstract sendTrack(
    transportId: string,
    roomId: string,
    rtpParameters: object,
  ): Promise<string>;
}
