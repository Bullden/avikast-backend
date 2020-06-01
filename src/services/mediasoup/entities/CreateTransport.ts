import {MediaAttributes} from 'entities/Mediasoup';

export type CreateTransportPattern = {
  area: 'transport';
  action: 'create';
};

export interface CreateTransportRequest {
  roomId: string;
  mediaAttributes: MediaAttributes;
}

export interface CreateTransportResponse {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}
