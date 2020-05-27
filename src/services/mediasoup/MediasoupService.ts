import IMediasoupService from './IMediasoupService';
import {Inject} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {MEDIASOUP_SERVICE} from './Constants';
import {requireResult} from './Utils';
import {Observable} from 'rxjs';
import {Pattern} from 'services/mediasoup/entities';
import {
  CreateRouterRequest,
  CreateRouterResponse,
} from 'services/mediasoup/entities/CreateRouter';

export default class MediasoupService extends IMediasoupService {
  constructor(@Inject(MEDIASOUP_SERVICE) private readonly mediasoupClient: ClientProxy) {
    super();
  }

  async createRouter() {
    const router = await this.sendAsyncRequired<
      CreateRouterResponse,
      CreateRouterRequest
    >({area: 'router', action: 'create'}, {});
    return router;
  }

  async createTransport(name: string) {
    const transport = await this.sendAsyncRequired<
      CreateRouterResponse,
      CreateRouterRequest
    >(
      {area: 'router', action: 'create'}, // TODO  {area: 'transport', action: 'create'}
      {name},
    );
    return transport;
  }

  async connectTransport(name: string) {
    await this.sendAsyncRequired<CreateRouterResponse, CreateRouterRequest>(
      {area: 'router', action: 'create'}, // TODO  {area: 'transport', action: 'connect'}
      {name},
    );
  }

  private send<TResult = never, TData = unknown>(
    pattern: Pattern,
    payload?: TData,
  ): Observable<TResult> {
    return this.mediasoupClient.send(pattern, payload);
  }

  private sendAsyncRequired<TResult = never, TData = unknown>(
    pattern: Pattern,
    payload?: TData,
  ): Promise<TResult> {
    const observable: Observable<TResult> = this.send(pattern, payload);
    return observable.toPromise().then(requireResult);
  }
}
