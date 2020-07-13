export type CloseRouterPattern = {
  area: 'router';
  action: 'close';
};

export interface CloseRouterRequest {
  roomId: string;
}

export interface CloseRouterResponse {
  response: boolean;
}
