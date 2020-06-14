import {MediaKind, MediaType} from 'entities/Mediasoup';

export type CreateProducerPattern = {
  area: 'producer';
  action: 'create';
};

export interface CreateProducerRequest {
  transportId: string;
  roomId: string;
  userId: string;
  rtpParameters: object;
  clientId: string;
  mediaType: MediaType;
  mediaKind: MediaKind;
}

export interface CreateProducerResponse {
  producerId: string;
  kind: MediaKind;
  rtpParameters: object;
  appData: object;
}
