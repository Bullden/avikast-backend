import {ID} from './Common';
import User from './User';

export default interface Bookmark {
  id: ID;
  date: Date;
  topic: string;
  text: string;
  user: User;
}
