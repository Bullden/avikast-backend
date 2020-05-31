export type GetRouterPattern = {
  area: 'router';
  action: 'get';
};

export interface GetRouterRequest {
  roomId: string;
}

export interface GetRouterResponse {
  rtpCapabilities: object;
}
