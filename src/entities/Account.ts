import User from './User';
import Preferences from './Preferences';

export default interface Account {
  user: User;
  preferences: Preferences;
}
