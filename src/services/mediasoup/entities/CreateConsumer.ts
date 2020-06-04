export type CreateConsumerPattern = {
  area: 'consumer';
  action: 'create';
};

export interface CreateConsumerRequest {
  producerId: string;
  roomId: string;
  rtpCapabilities: object;
  clientId: string;
  userId: string;
}

export interface CreateConsumerResponse {
  id: string;
  producerId: string;
  rtpParameters: object;
}
