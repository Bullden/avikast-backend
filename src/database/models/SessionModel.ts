import {createSchema} from './Common';
import {Document} from 'mongoose';
import AppType from '../../entities/AppType';
import {Platform} from '../../entities/Platform';
import UserModel, {UserSchema} from './UserModel';

export const SessionSchema = createSchema('Session', {
  token: String,
  refreshToken: String,
  user: {type: String, ref: UserSchema.name},
  appType: String,
  platform: String,
  firebaseRegistrationId: String,
});

export default interface SessionModel extends Document {
  token: string;
  refreshToken: string;
  user?: UserModel;
  appType: AppType;
  platform: Platform;
  firebaseRegistrationId?: string;
}

export interface CreateSessionModel {
  token: string;
  refreshToken: string;
  user: string;
  appType: AppType;
  platform: Platform;
  firebaseRegistrationId?: string;
}
