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
  GetProducersRequest,
  GetProducersResponse,
  GetRouterRequest,
  GetRouterResponse,
  Pattern,
} from './entities';
import {Direction} from 'entities/Mediasoup';

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

  async createTransport(
    roomId: string,
    userId: string,
    direction: Direction,
    clientId: string,
  ) {
    const response = await this.sendAsyncRequired<
      CreateTransportRequest,
      CreateTransportResponse
    >({area: 'transport', action: 'create'}, {roomId, userId, direction, clientId});
    console.log('ROOMID BAKCEND', roomId);
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
    direction: string,
    clientId: string,
  ) {
    await this.sendAsync<ConnectTransportRequest, ConnectTransportResponse>(
      {area: 'transport', action: 'connect'},
      {roomId, dtlsParameters, direction, clientId},
    );
  }

  async createProducer(
    roomId: string,
    userId: string,
    transportId: string,
    rtpParameters: object,
    clientId: string,
  ) {
    const response = await this.sendAsyncRequired<
      CreateProducerRequest,
      CreateProducerResponse
    >(
      {area: 'producer', action: 'create'},
      {roomId, userId, transportId, rtpParameters, clientId},
    );
    return {
      id: response.producerId,
      kind: response.kind,
      rtpParameters: response.rtpParameters,
    };
  }

  async createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
    userId: string,
  ) {
    const response = await this.sendAsyncRequired<
      CreateConsumerRequest,
      CreateConsumerResponse
    >(
      {area: 'consumer', action: 'create'},
      {roomId, producerId, rtpCapabilities, clientId, userId},
    );
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

  async getProducers(roomId: string) {
    const response = await this.sendAsyncRequired<
      GetProducersRequest,
      GetProducersResponse
    >({area: 'producers', action: 'get'}, {roomId});
    return response.producers;
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
