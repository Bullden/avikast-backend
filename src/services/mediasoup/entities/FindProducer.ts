export type FindProducerPattern = {
  area: 'producer';
  action: 'find';
};

export interface FindProducerRequest {
  filter: object;
}

export interface FindProducerResponse {
  producerId: string;
}
