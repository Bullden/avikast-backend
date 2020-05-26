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
    await this.sendAsyncRequired<CreateRouterResponse, CreateRouterRequest>(
      {area: 'router', action: 'create'},
      {},
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
