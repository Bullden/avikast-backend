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
  StartRecordingRequest,
  StartRecordingResponse,
  StopRecordingRequest,
  StopRecordingResponse,
  MuteRequest,
  MuteResponse,
  // UnMuteRequest,
  // UnMuteResponse,
} from './entities';
import {Direction, MediaKind, MediaType, Quality} from 'entities/Mediasoup';
import {
  CloseRouterRequest,
  CloseRouterResponse,
} from 'services/mediasoup/entities/CloseRouter';
import {LeaveRoomRequest, LeaveRoomResponse} from 'services/mediasoup/entities/LeaveRoom';
import {MuteAction} from 'entities/Room';

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
    quality: Quality,
  ) {
    await this.sendAsync<ConnectTransportRequest, ConnectTransportResponse>(
      {area: 'transport', action: 'connect'},
      {roomId, dtlsParameters, direction, clientId, quality},
    );
  }

  async createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    userId: string,
    rtpParameters: object,
    mediaType: MediaType,
    mediaKind: MediaKind,
  ) {
    const response = await this.sendAsyncRequired<
      CreateProducerRequest,
      CreateProducerResponse
    >(
      {area: 'producer', action: 'create'},
      {roomId, userId, transportId, rtpParameters, clientId, mediaType, mediaKind},
    );
    return {
      id: response.producerId,
      kind: response.kind,
      rtpParameters: response.rtpParameters,
      appData: response.appData,
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
      appData: response.appData,
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

  async getProducer(roomId: string, userId: string) {
    const response = await this.sendAsyncRequired<
      GetProducerRequest,
      GetProducerResponse
    >({area: 'producer', action: 'get'}, {roomId, userId});
    return {
      id: response.id,
      kind: response.kind,
      rtpParameters: response.rtpParameters,
      appData: response.appData,
    };
  }

  async getProducers(roomId: string) {
    const response = await this.sendAsyncRequired<
      GetProducersRequest,
      GetProducersResponse
    >({area: 'producers', action: 'get'}, {roomId});
    return response.producers;
  }

  async startRecording(
    roomId: string,
    userId: string,
    recordId: string,
    producerId?: string,
    audioProducerId?: string,
  ) {
    const response = await this.sendAsyncRequired<
      StartRecordingRequest,
      StartRecordingResponse
    >(
      {area: 'recording', action: 'start'},
      {roomId, userId, recordId, producerId, audioProducerId},
    );
    return response.response;
  }

  async stopRecording(
    roomId: string,
    userId: string,
    producerId?: string,
    audioProducerId?: string,
  ) {
    const response = await this.sendAsyncRequired<
      StopRecordingRequest,
      StopRecordingResponse
    >({area: 'recording', action: 'stop'}, {roomId, userId, producerId, audioProducerId});
    return response.response;
  }

  async leaveRoom(roomId: string, userId: string) {
    const response = await this.sendAsyncRequired<LeaveRoomRequest, LeaveRoomResponse>(
      {area: 'router', action: 'leave'},
      {roomId, userId},
    );
    return response.response;
  }

  async closeRoom(roomId: string) {
    const response = await this.sendAsyncRequired<
      CloseRouterRequest,
      CloseRouterResponse
    >({area: 'router', action: 'close'}, {roomId});
    return response.response;
  }

  async mute(action: MuteAction, roomId: string, userId: string, producerId: string) {
    const response = await this.sendAsyncRequired<MuteRequest, MuteResponse>(
      {area: 'producer', action: 'mute'},
      {action, roomId, userId, producerId},
    );
    return response.response;
  }

  // async unMute(source: MuteSource, userId: string, roomId: string) {
  //   const response = await this.sendAsyncRequired<UnMuteRequest, UnMuteResponse>(
  //     {area: 'producer', action: 'unmute'},
  //     {source, userId, roomId},
  //   );
  //   return response.response;
  // }

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
