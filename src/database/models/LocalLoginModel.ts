import {createSchema} from './Common';
import {Document} from 'mongoose';
import UserModel from './UserModel';

export const LocalLoginSchema = createSchema('localLogin', {
  user: {type: String, ref: 'user'},
  email: {type: String, unique: true},
  passwordHash: String,
});

export default interface LocalLoginModel extends Document {
  user?: UserModel | string;
  email: string;
  passwordHash: string;
}

export interface CreateLocalLoginModel {
  user: string;
  email: string;
  passwordHash: string;
}
