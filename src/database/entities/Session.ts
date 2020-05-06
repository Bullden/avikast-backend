import User from './User';
import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';
import {ID} from './Common';

export default interface Session {
  id: ID;
  token: string;
  refreshToken: string;
  user: User;
  userId: string;
  appType: AppType;
  platform: Platform;
  firebaseRegistrationId?: string;
}
