import {createSchema} from './Common';
import {Document} from 'mongoose';
import User from '../entities/User';
import AppType from '../../entities/AppType';
import {Platform} from '../../entities/Platform';
import {UserSchema} from './UserModel';
import * as module from 'module';

import ObjectId = module;

export const SessionSchema = createSchema('Session', {
  id: ObjectId,
  token: String,
  refreshToken: String,
  user: UserSchema,
  userId: String,
  appType: AppType,
  platform: Platform,
  firebaseRegistrationId: String,
});

export default interface Session extends Document {
  id: string;
  token: string;
  refreshToken: string;
  user: User;
  userId: string;
  appType: AppType;
  platform: Platform;
  firebaseRegistrationId?: string;
}
