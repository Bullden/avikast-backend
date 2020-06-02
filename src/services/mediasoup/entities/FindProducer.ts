import {Kind} from 'entities/Mediasoup';

export type FindProducerPattern = {
  area: 'producer';
  action: 'find';
};

export interface FindProducerRequest {
  roomId: string;
  userId: string;
}

export interface FindProducerResponse {
  id: string;
  kind: Kind;
  rtpParameters: object;
}
