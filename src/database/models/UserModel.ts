import {Document} from 'mongoose';
import {createSchema} from './Common';

export const UserSchema = createSchema('user', {
  id: String,
  name: String,
  email: String,
  country: String,
  city: String,
  dateOfBirth: Date,
  avatarUrl: String,
  tags: [String],
  skills: [String],
  allowNotifications: Boolean,
});

export default interface UserModel extends Document {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  dateOfBirth: Date;
  avatarUrl: string;
  tags: string[];
  skills: string[];
  allowNotifications: boolean;
}
