import {ID} from './Common';
import User from './User';

export default interface Message {
  id: ID;
  sender: User;
  roomId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}
