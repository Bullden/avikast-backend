import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';
import FileModel, {FileSchema} from 'database/models/FileModel';

const schemaName = 'record';

export const RecordSchema = createSchema(schemaName, {
  id: {type: String, required: true},
  name: {type: String, required: true},
  date: {type: Date, required: true},
  time: {type: String, required: false},
  user: {type: String, ref: UserSchema.name},
  file: {type: String, ref: FileSchema.name},
});

export default interface RecordModel extends Document {
  name: string;
  date: Date;
  time: string;
  user: UserModel | string;
  file: FileModel | string;
}

export interface CreateRecordModel {
  id: string;
  name: string;
  date: Date;
  user: string;
  file: string;
}
