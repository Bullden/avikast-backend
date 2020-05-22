import User from './User';
import Preferences from 'graphql/entities/user/Preferences';

export default interface Account {
  user: User;
  preferences: Preferences;
}
