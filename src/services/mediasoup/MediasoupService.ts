import IMediasoupService from './IMediasoupService';
import {Inject} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {MEDIASOUP_SERVICE} from './Constants';
import {requireResult} from './Utils';
import {Observable} from 'rxjs';
import {
  ConnectTransportRequest,
  ConnectTransportResponse,
  CreateConsumerRequest,
  CreateConsumerResponse,
  CreateProducerRequest,
  CreateProducerResponse,
  CreateRouterRequest,
  CreateRouterResponse,
  CreateTransportRequest,
  CreateTransportResponse,
  GetProducerRequest,
  GetProducerResponse,
  GetRouterRequest,
  GetRouterResponse,
  Pattern,
} from './entities';
import {MediaAttributes} from 'entities/Mediasoup';

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

  async createTransport(roomId: string, mediaAttributes: MediaAttributes) {
    const response = await this.sendAsyncRequired<
      CreateTransportRequest,
      CreateTransportResponse
    >({area: 'transport', action: 'create'}, {roomId, mediaAttributes});
    return {
      id: response.id,
      iceCandidates: response.iceCandidates,
      iceParameters: response.iceParameters,
      dtlsParameters: response.dtlsParameters,
    };
  }

  async connectTransport(
    roomId: string,
    dtlsParameters: object,
    mediaAttributes: MediaAttributes,
  ) {
    await this.sendAsync<ConnectTransportRequest, ConnectTransportResponse>(
      {area: 'transport', action: 'connect'},
      {roomId, dtlsParameters, mediaAttributes},
    );
  }

  async createProducer(
    userId: string,
    transportId: string,
    roomId: string,
    rtpParameters: object,
  ) {
    const response = await this.sendAsyncRequired<
      CreateProducerRequest,
      CreateProducerResponse
    >({area: 'producer', action: 'create'}, {userId, transportId, roomId, rtpParameters});
    return {
      id: response.producerId,
      kind: response.kind,
      rtpParameters: response.rtpParameters,
    };
  }

  async createConsumer(producerId: string, roomId: string, rtpCapabilities: object) {
    const response = await this.sendAsyncRequired<
      CreateConsumerRequest,
      CreateConsumerResponse
    >({area: 'consumer', action: 'create'}, {producerId, roomId, rtpCapabilities});
    return {
      id: response.id,
      producerId: response.producerId,
      rtpParameters: response.rtpParameters,
    };
  }

  async getRouter(roomId: string) {
    const response = await this.sendAsyncRequired<GetRouterRequest, GetRouterResponse>(
      {area: 'router', action: 'get'},
      {roomId},
    );
    return {
      rtpCapabilities: response.rtpCapabilities,
    };
  }

  async getProducer(userId: string, roomId: string) {
    const response = await this.sendAsyncRequired<
      GetProducerRequest,
      GetProducerResponse
    >({area: 'producer', action: 'get'}, {roomId, userId});
    return {
      id: response.id,
      kind: response.kind,
      rtpParameters: response.rtpParameters,
    };
  }

  // region Helpers
  private send<TData = unknown, TResult = never>(
    pattern: Pattern,
    payload?: TData,
  ): Observable<TResult> {
    return this.mediasoupClient.send(pattern, payload);
  }

  private sendAsync<TData = unknown, TResult = never>(
    pattern: Pattern,
    payload?: TData,
  ): Promise<void> {
    const observable: Observable<TResult> = this.send(pattern, payload);
    return observable.toPromise().then();
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
