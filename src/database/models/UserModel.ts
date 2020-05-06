import * as mongoose from 'mongoose';
import {Document} from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

export const userModelName = 'user';

export default interface UserModel extends Document {
  id: string;
  name: string;
  email: string;
  allowNotifications: boolean;
}
