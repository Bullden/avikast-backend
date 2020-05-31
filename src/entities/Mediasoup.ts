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
  kind: object;
  rtpParameters: object;
}

export interface TransportOptions {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}
