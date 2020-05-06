import User from './User';
import {ID} from './Common';

export default interface LocalLogin {
  id: ID;
  user: User;
  email: string;
  passwordHash: string;
}
