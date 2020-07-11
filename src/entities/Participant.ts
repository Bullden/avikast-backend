import User from './User';
import {MediaKind, MediaType, ProducerOptions} from 'entities/Mediasoup';

export enum ParticipantRole {
  Owner = 'Owner',
  Participant = 'Participant',
}

export interface ParticipantMedia {
  userName: string;
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
  webinarOptions: WebinarOptions | undefined;
  raiseHand: boolean | undefined;
}

export interface WebinarOwner {
  id: string;
  user: User;
  role: ParticipantRole;
  media: ParticipantMedia;
  webinarOptions: WebinarOptions;
}

export interface WebinarOptions {
  viewMode: ViewModeEnum;
  viewModeScale: ViewModeScale;
}

export enum ViewModeEnum {
  CameraAndScreen = 'CameraAndScreen',
  CameraMain = 'CameraMain',
  ScreenMain = 'ScreenMain',
  None = 'None',
}

export enum ViewModeScale {
  oneX = '1x',
  twoX = '2x',
  threeX = '3x',
}
