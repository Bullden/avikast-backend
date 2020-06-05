import {ProducerOptions} from 'entities/Mediasoup';

export type GetProducersPattern = {
  area: 'producers';
  action: 'get';
};

export interface GetProducersRequest {
  roomId: string;
}

export interface GetProducersResponse {
  producers: ProducerOptions[];
}
