import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';

const schemaName = 'message';

export const MessageSchema = createSchema(schemaName, {
  sender: {type: String, ref: UserSchema.name, required: true},
  roomId: {type: String, required: true},
  body: {type: String, required: true},
  date: {type: String, required: true},
  receiverId: {type: String},
});

export default interface MessageModel extends Document {
  sender: UserModel;
  roomId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}

export interface CreateMessageModel {
  sender: string;
  roomId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}
