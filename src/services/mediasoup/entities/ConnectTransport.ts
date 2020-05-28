export type ConnectTransportPattern = {
  area: 'transport';
  action: 'connect';
};

export interface ConnectTransportRequest {
  roomId: string;
  dtlsParameters: object;
}

export interface ConnectTransportResponse {}
