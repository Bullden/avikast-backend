import User from './User';
import {MediaKind, MediaType, ProducerOptions} from 'entities/Mediasoup';

export enum ParticipantRole {
  Owner = 'Owner',
  User = 'User',
}
export interface ParticipantMedia {
  audio: ParticipantTrackOptions;
  video: ParticipantTrackOptions;
  screen: ParticipantTrackOptions;
}

export type ParticipantTrackOptions = {
  enabled: boolean;
  clientId: string | undefined;
  producerOptions: ProducerOptions | undefined;
  mediaKind: MediaKind | undefined;
  mediaType: MediaType | undefined;
};

export default interface Participant {
  id: string;
  user: User;
  role: ParticipantRole;
  media: ParticipantMedia;
}
