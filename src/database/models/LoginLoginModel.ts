import {createSchema} from './Common';
import {Document} from 'mongoose';

export const LocalLoginSchema = createSchema('localLogin', {
  userId: String,
  email: String,
  passwordHash: String,
});

export default interface LocalLogin extends Document {
  userId: string;
  email: string;
  passwordHash: string;
}
