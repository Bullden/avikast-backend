import {Document} from 'mongoose';
import {createSchema} from './Common';

export const UserSchema = createSchema('user', {
  name: String,
  email: String,
  allowNotifications: Boolean,
});

export default interface UserModel extends Document {
  name: string;
  email: string;
  allowNotifications: boolean;
}
