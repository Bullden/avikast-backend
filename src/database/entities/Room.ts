import {ID} from './Common';
import User from './User';
import {RoomType} from 'entities/Room';

export default interface Room {
  id: ID;
  name: string;
  closed: undefined | Date;
  type: RoomType;
  user: User;
  passwordProtected: boolean;
  password: string | undefined;
  inviteLink: string;
  recordingId: string | undefined;
}
