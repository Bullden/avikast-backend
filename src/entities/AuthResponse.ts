import User from 'entities/User';
import Session from 'entities/Session';

export default interface AuthResponse extends Session {
  user: User;
}
