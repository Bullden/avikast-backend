export type SendTrackPattern = {
  area: 'track';
  action: 'send';
};

export interface SendTrackRequest {
  transportId: string;
  roomId: string;
  kind: string;
  rtpParameters: object;
}

export interface SendTrackResponse {
  producerId: string;
}
