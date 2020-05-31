import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';
import {RoomType} from 'entities/Room';

export const RoomSchema = createSchema('room', {
  name: {type: String, required: true},
  type: {type: RoomType, enum: RoomType, required: true},
  user: {type: String, ref: UserSchema.name},
  passwordProtected: {type: Boolean, required: true},
  password: {type: String},
});

export default interface RoomModel extends Document {
  name: string;
  type: RoomType;
  user: UserModel | string;
  passwordProtected: boolean;
  password: string | undefined;
}

export interface CreateRoomModel {
  name: string;
  type: RoomType;
  user: string;
  passwordProtected: boolean;
  password: string | undefined;
}
