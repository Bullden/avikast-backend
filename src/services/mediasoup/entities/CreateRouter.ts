export type CreateRouterPattern = {
  area: 'router' | 'transport';
  action: 'create';
};

export interface CreateRouterRequest {}

export interface CreateRouterResponse {
  rtpCapabilities: object;
}
