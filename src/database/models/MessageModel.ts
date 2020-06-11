import {Document} from 'mongoose';
import {createSchema} from './Common';

const schemaName = 'message';

export const MessageSchema = createSchema(schemaName, {
  senderId: {type: String, required: true},
  chatId: {type: String, required: true},
  body: {type: String, required: true},
  date: {type: String, required: true},
  receiverId: {type: String},
});

export default interface MessageModel extends Document {
  senderId: string;
  chatId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}

export interface CreateMessageModel {
  senderId: string;
  chatId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}
