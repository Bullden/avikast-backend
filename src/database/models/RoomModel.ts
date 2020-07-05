import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';
import {RoomType} from 'entities/Room';

export const RoomSchema = createSchema('room', {
  name: {type: String, required: true},
  type: {type: RoomType, enum: RoomType, required: true},
  user: {type: String, ref: UserSchema.name, required: true},
  passwordProtected: {type: Boolean, required: true},
  password: {type: String},
  inviteLink: {type: String, required: true},
});

export default interface RoomModel extends Document {
  name: string;
  type: RoomType;
  user: UserModel | string;
  passwordProtected: boolean;
  password: string | undefined;
  inviteLink: string;
}

export interface CreateRoomModel {
  name: string;
  type: RoomType;
  user: string;
  passwordProtected: boolean;
  password: string | undefined;
  inviteLink: string;
  webinarOptions: WebinarOptions | undefined;
}

export interface WebinarOptions {
  webinarOwner: string;
  viewMode: ViewModeEnum;
  viewModeScale: ViewModeScale;
}

export enum ViewModeEnum {
  CameraAndScreen = 'CameraAndScreen',
  CameraMain = 'CameraMain',
  ScreenMain = 'ScreenMain',
  None = 'None',
}

export enum ViewModeScale {
  oneX = '1x',
  twoX = '2x',
  threeX = '3x',
}
