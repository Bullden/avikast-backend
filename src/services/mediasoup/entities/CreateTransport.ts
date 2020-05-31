export type CreateTransportPattern = {
  area: 'transport';
  action: 'create';
};

export interface CreateTransportRequest {
  roomId: string;
  direction: 'send' | 'receive';
}

export interface CreateTransportResponse {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}
