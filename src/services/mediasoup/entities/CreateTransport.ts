import {Direction, MediaAttributes} from 'entities/Mediasoup';

export type CreateTransportPattern = {
  area: 'transport';
  action: 'create';
};

export interface CreateTransportRequest {
  roomId: string;
  direction: Direction;
  clientId: string;
}

export interface CreateTransportResponse {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}
