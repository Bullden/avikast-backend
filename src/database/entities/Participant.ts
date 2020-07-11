import Room from './Room';
import User from './User';
import {ParticipantMedia, ParticipantRole, WebinarOptions} from 'entities/Participant';

export default interface Participant {
  id: string;
  user: User;
  room: Room;
  role: ParticipantRole;
  media: ParticipantMedia;
  webinarOptions: WebinarOptions | undefined;
  raiseHand: boolean | undefined;
}
