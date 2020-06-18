import User from './User';
import {ParticipantTrackOptions} from 'entities/Mediasoup';

export enum ParticipantRole {
  Owner = 'Owner',
  User = 'User',
}
export interface ParticipantMedia {
  audio: ParticipantTrackOptions;
  video: ParticipantTrackOptions;
  screen: ParticipantTrackOptions;
}

export default interface Participant {
  id: string;
  user: User;
  role: ParticipantRole;
  media: ParticipantMedia;
}
