export type SendTrackPattern = {
  area: 'track';
  action: 'send';
};

export interface SendTrackRequest {
  transportId: string;
  roomId: string;
  rtpParameters: object;
}

export interface SendTrackResponse {
  producerId: string;
}
