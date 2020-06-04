export type ConnectTransportPattern = {
  area: 'transport';
  action: 'connect';
};

export interface ConnectTransportRequest {
  roomId: string;
  dtlsParameters: object;
  direction: string;
  clientId: string;
}

export type ConnectTransportResponse = void;
