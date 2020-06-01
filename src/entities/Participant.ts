import Room from './Room';
import User from './User';

export enum ParticipantRole {
  Owner = 'Owner',
  User = 'User',
}

export default interface Participant {
  id: string;
  user: User;
  room: Room;
  role: ParticipantRole;
}
