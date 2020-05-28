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
import {
  CreateTransportRequest,
  CreateTransportResponse,
} from 'services/mediasoup/entities/CreateTransport';
import {
  ConnectTransportRequest,
  ConnectTransportResponse,
} from 'services/mediasoup/entities/ConnectTransport';

export default class MediasoupService extends IMediasoupService {
  constructor(@Inject(MEDIASOUP_SERVICE) private readonly mediasoupClient: ClientProxy) {
    super();
  }

  async createRouter(roomId: string) {
    const response = await this.sendAsyncRequired<
      CreateRouterRequest,
      CreateRouterResponse
    >({area: 'router', action: 'create'}, {roomId});
    return {rtpCapabilities: response.rtpCapabilities};
  }

  async createTransport(roomId: string) {
    const response = await this.sendAsyncRequired<
      CreateTransportRequest,
      CreateTransportResponse
    >({area: 'transport', action: 'create'}, {roomId});
    return {
      id: response.id,
      iceCandidates: response.iceCandidates,
      iceParameters: response.iceParameters,
      dtlsParameters: response.dtlsParameters,
    };
  }

  async connectTransport(roomId: string, dtlsParameters: object) {
    await this.sendAsyncRequired<ConnectTransportRequest, ConnectTransportResponse>(
      {area: 'transport', action: 'connect'},
      {roomId, dtlsParameters},
    );
    // eslint-disable-next-line no-console
    console.log('ConnectTransportRequest', dtlsParameters);
  }

  // region Helpers
  private send<TData = unknown, TResult = never>(
    pattern: Pattern,
    payload?: TData,
  ): Observable<TResult> {
    return this.mediasoupClient.send(pattern, payload);
  }

  private sendAsyncRequired<TData = unknown, TResult = never>(
    pattern: Pattern,
    payload?: TData,
  ): Promise<TResult> {
    const observable: Observable<TResult> = this.send(pattern, payload);
    return observable.toPromise().then(requireResult);
  }
  // endregion
}
