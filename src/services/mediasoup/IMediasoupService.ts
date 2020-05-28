import Router from 'entities/Router';
import TransportOptions from '../../entities/TransportOptions';

export default abstract class IMediasoupService {
  abstract createRouter(roomId: string): Promise<Router>;

  abstract createTransport(roomId: string): Promise<TransportOptions>;
}
