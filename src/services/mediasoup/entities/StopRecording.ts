export type StopRecordingPattern = {
  area: 'recording';
  action: 'stop';
};

export interface StopRecordingRequest {
  roomId: string;
  userId: string;
  producerId?: string;
  audioProducerId?: string;
}

export interface StopRecordingResponse {
  response: boolean;
}
