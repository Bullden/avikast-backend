export type StopRecordingPattern = {
  area: 'recording';
  action: 'stop';
};

export interface StopRecordingRequest {
  roomId: string;
  userId: string;
  producerId: string;
}

export interface StopRecordingResponse {
  response: boolean;
}
