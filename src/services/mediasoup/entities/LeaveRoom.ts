export type LeaveRoomPattern = {
  area: 'router';
  action: 'leave';
};

export interface LeaveRoomRequest {
  roomId: string;
  userId: string;
}

export interface LeaveRoomResponse {
  response: boolean;
}
