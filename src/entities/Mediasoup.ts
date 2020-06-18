export enum MediaKind {
  audio = 'audio',
  video = 'video',
}

export enum MediaType {
  userMedia = 'userMedia',
  screenShare = 'screenShare',
}

export type Direction = 'send' | 'receive';

export interface ConsumerOptions {
  id: string;
  producerId: string;
  rtpParameters: object;
}

export interface RouterOptions {
  rtpCapabilities: object;
}

export interface ProducerOptions {
  id: string;
  kind: MediaKind;
  rtpParameters: object;
}

export interface TransportOptions {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}
