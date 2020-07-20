import User from './User';
import Session from './Session';

export default interface AuthResponse extends Session {
  user: User;
}
