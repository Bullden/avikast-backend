import DtlsParameters from '../../../entities/DtlsParameters';

export type ConnectTransportPattern = {
  area: 'transport';
  action: 'connect';
};

export interface ConnectTransportRequest {
  roomId: string;
  dtlsParameters: DtlsParameters;
}

export interface ConnectTransportResponse {}
