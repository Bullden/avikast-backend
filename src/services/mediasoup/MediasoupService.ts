import IMediasoupService from './IMediasoupService';
import {Inject} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {MEDIASOUP_SERVICE} from './Constants';
import {requireResult} from './Utils';
import {patterns} from 'services/mediasoup/patterns';
import {Observable} from 'rxjs';

export default class MediasoupService extends IMediasoupService {
  constructor(@Inject(MEDIASOUP_SERVICE) private readonly mediasoupClient: ClientProxy) {
    super();
  }

  async add() {
    return this.sendAsyncRequired<never>({area: 'room', action: 'create'});
  }

  private send<TResult = never, TData = unknown>(
    pattern: patterns,
    payload?: TData,
  ): Observable<TResult> {
    return this.mediasoupClient.send(pattern, payload);
  }

  private sendAsyncRequired<TResult = never, TData = unknown>(
    pattern: patterns,
    payload?: TData,
  ): Promise<TResult> {
    const observable: Observable<TResult> = this.send(pattern, payload);
    return observable.toPromise().then(requireResult);
  }
}
