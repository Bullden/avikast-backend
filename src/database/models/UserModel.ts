import {Document} from 'mongoose';
import {createSchema} from './Common';

const schemaName = 'user';

export const UserSchema = createSchema(schemaName, {
  name: {type: String, required: true},
  email: {type: String, required: true},
  country: {type: String, required: true},
  city: {type: String, required: true},
  dateOfBirth: {type: Date},
  avatarUrl: {type: String, required: true},
  tags: {type: [String], required: true},
  skills: {type: [String], required: true},
  allowNotifications: {type: Boolean, required: true, default: true},
  referralCode: {type: String, required: true},
  referrer: {type: String, ref: schemaName},
  banUntilDate: {type: Date, required: false},
  banForever: {type: Boolean, required: false},
});

export default interface UserModel extends Document {
  name: string;
  email: string;
  country: string;
  city: string;
  dateOfBirth: Date | null;
  avatarUrl: string;
  tags: string[];
  skills: string[];
  allowNotifications: boolean;
  referralCode: string;
  referrer: UserModel | string;
  banUntilDate: Date;
  banForever: boolean;
}
