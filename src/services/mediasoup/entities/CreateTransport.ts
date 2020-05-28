export type CreateTransportPattern = {
  area: 'transport';
  action: 'create';
};

export interface CreateTransportRequest {
  roomId: string;
}

export interface CreateTransportResponse {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}
