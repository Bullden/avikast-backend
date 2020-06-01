import {MediaAttributes} from 'entities/Mediasoup';

export type ConnectTransportPattern = {
  area: 'transport';
  action: 'connect';
};

export interface ConnectTransportRequest {
  roomId: string;
  dtlsParameters: object;
  mediaAttributes: MediaAttributes;
}

export type ConnectTransportResponse = void;
