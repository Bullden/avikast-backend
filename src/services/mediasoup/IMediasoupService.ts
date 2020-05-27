import Router from './entities/Router';

export default abstract class IMediasoupService {
  abstract createRouter(): Promise<Router>;
}
