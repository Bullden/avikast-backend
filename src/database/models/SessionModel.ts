import {createSchema} from './Common';
import {Document} from 'mongoose';

export const SessionSchema = createSchema('Session', {
  token: String,
  refreshToken: String,
  userId: String,
  appType: String,
  platform: String,
  firebaseRegistrationId: String,
});

export default interface Session extends Document {
  token: string;
  refreshToken: string;
  userId: string;
  appType: string;
  platform: string;
  firebaseRegistrationId?: string;
}
