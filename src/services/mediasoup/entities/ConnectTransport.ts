import {Quality} from 'entities/Mediasoup';

export type ConnectTransportPattern = {
  area: 'transport';
  action: 'connect';
};

export interface ConnectTransportRequest {
  roomId: string;
  dtlsParameters: object;
  direction: string;
  clientId: string;
  quality: Quality;
}

export type ConnectTransportResponse = void;
