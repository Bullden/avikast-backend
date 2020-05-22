import {Document} from 'mongoose';
import {createSchema} from './Common';

export const UserSchema = createSchema('user', {
  name: {type: String, required: true},
  email: {type: String, required: true},
  country: {type: String, required: true},
  city: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  avatarUrl: {type: String, required: true},
  tags: {type: [String], required: true},
  skills: {type: [String], required: true},
  allowNotifications: {type: Boolean, required: true, default: true},
});

export default interface UserModel extends Document {
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
