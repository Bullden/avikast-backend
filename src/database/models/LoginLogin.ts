import {createSchema} from './Common';
import {Document} from 'mongoose';

export const LocalLoginSchema = createSchema('localLogin', {
  user: String,
  email: String,
  passwordHash: String,
});

export default interface LocalLogin extends Document {
  user: string;
  email: string;
  passwordHash: string;
}
