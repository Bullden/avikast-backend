import {MediaKind} from 'entities/Mediasoup';

export type GetProducerPattern = {
  area: 'producer';
  action: 'get';
};

export interface GetProducerRequest {
  roomId: string;
  userId: string;
}

export interface GetProducerResponse {
  id: string;
  kind: MediaKind;
  rtpParameters: object;
  appData: object;
}
