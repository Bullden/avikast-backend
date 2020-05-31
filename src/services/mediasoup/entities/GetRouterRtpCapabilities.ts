import {RouterOptions} from 'entities/Mediasoup';

export type GetRouterCapabilitiesByRoomIdPattern = {
  area: 'router';
  action: 'get';
};

export interface GetRouterCapabilitiesByRoomIdRequest {
  roomId: string;
}

export interface GetRouterCapabilitiesByRoomIdResponse {
  rtpCapabilities: RouterOptions;
}
