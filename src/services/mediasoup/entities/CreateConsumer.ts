export type CreateConsumerPattern = {
  area: 'consumer';
  action: 'create';
};

export interface CreateConsumerRequest {
  producerId: string;
  roomId: string;
  rtpCapabilities: object;
}

export interface CreateConsumerResponse {
  id: string;
  producerId: string;
  rtpParameters: object;
}
