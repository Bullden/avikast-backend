export type ConnectTransportPattern = {
  area: 'transport';
  action: 'connect';
};

export interface ConnectTransportRequest {
  roomId: string;
  dtlsParameters: object;
  direction: 'send' | 'receive';
}

export type ConnectTransportResponse = void;
