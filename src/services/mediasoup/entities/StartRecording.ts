export type StartRecordingPattern = {
  area: 'recording';
  action: 'start';
};

export interface StartRecordingRequest {
  roomId: string;
  userId: string;
  producerId?: string;
  audioProducerId?: string;
}

export interface StartRecordingResponse {
  response: boolean;
}
