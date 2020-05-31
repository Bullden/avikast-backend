export type CreateProducerPattern = {
  area: 'producer';
  action: 'create';
};

export interface CreateProducerRequest {
  transportId: string;
  roomId: string;
  rtpParameters: object;
}

export interface CreateProducerResponse {
  producerId: string;
}
