import User from './User';
import {RenewParticipantMedia} from 'entities/Mediasoup';

export enum ParticipantRole {
  Owner = 'Owner',
  User = 'User',
}
export interface ParticipantMedia {
  audio: RenewParticipantMedia;
  video: RenewParticipantMedia;
  screen: RenewParticipantMedia;
}

export interface ParticipantTrack {
  clientId: string;
  audio: RenewParticipantMedia;
  video: RenewParticipantMedia;
  screen: RenewParticipantMedia;
}

export default interface Participant {
  id: string;
  user: User;
  role: ParticipantRole;
  media: ParticipantMedia;
}
