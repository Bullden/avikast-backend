export type CreateRouterPattern = {
  area: 'router';
  action: 'create';
};

export interface CreateRouterRequest {
  roomId: string;
}

export interface CreateRouterResponse {
  rtpCapabilities: object;
}
