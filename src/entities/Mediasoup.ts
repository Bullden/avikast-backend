export type MediaKind = 'audio' | 'video';

export type MediaType = 'camera' | 'screen';

export type RenewParticipantMedia = {
  enabled: boolean;
  options: ProducerOptions | undefined;
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
  appData: object;
}

export interface TransportOptions {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}

// todo REMOVE
export type Audio = {
  type: 'audio';
  request: string | boolean | undefined;
};

export type Video = {
  type: 'video';
  request: string | boolean | undefined;
};

export type Screen = {
  type: 'screen';
  request: string | boolean | undefined;
};
