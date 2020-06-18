export enum MediaKind {
  audio = 'audio',
  video = 'video',
}

export enum MediaType {
  userMedia = 'userMedia',
  screenShare = 'screenShare',
}

export type ParticipantTrackOptions = {
  enabled: boolean;
  clientId: string | undefined;
  producerOptions: ProducerOptions | undefined;
  mediaKind: MediaKind | undefined;
  mediaType: MediaType | undefined;
};

export type Direction = 'send' | 'receive';

export interface MediaAttributes {
  kind: MediaKind;
  mediaType: MediaType;
  direction: Direction;
}

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
