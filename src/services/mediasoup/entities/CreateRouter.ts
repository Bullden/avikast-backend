export type CreateRouterPattern = {
  area: 'router' | 'transport';
  action: 'create';
};

export interface CreateRouterRequest {
  roomId: string;
}

export interface CreateRouterResponse {
  rtpCapabilities: object;
}
