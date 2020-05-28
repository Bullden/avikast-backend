import Router from 'entities/Router';
import TransportOptions from '../../entities/TransportOptions';
import DtlsParameters from '../../entities/DtlsParameters';

export default abstract class IMediasoupService {
  abstract createRouter(roomId: string): Promise<Router>;

  abstract createTransport(roomId: string): Promise<TransportOptions>;

  abstract connectTransport(roomId: string, dtlsParam: DtlsParameters): Promise<boolean>;
}
