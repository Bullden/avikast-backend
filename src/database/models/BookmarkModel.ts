import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';

const schemaName = 'bookmark';

export const BookmarkSchema = createSchema(schemaName, {
  id: {type: String, required: true},
  date: {type: Date, required: true},
  topic: {type: String, required: true},
  text: {type: String, required: true},
  user: {type: String, ref: UserSchema.name},
});

export default interface BookmarkModel extends Document {
  id: string;
  date: Date;
  topic: string;
  text: string;
  user: UserModel | string;
}
