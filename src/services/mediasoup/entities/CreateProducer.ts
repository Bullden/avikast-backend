import {Kind} from 'entities/Mediasoup';

export type CreateProducerPattern = {
  area: 'producer';
  action: 'create';
};

export interface CreateProducerRequest {
  transportId: string;
  roomId: string;
  userId: string;
  rtpParameters: object;
}

export interface CreateProducerResponse {
  producerId: string;
  kind: Kind;
  rtpParameters: object;
}
