import {Document} from 'mongoose';
import {createSchema} from './Common';
import {AvikastFileType} from 'entities/AvikastFile';
import UserModel, {UserSchema} from './UserModel';
import FileModel, {FileSchema} from 'database/models/FileModel';

const schemaName = 'avikastFile';

export const AvikastFileSchema = createSchema(schemaName, {
  name: {type: String, required: true},
  type: {type: AvikastFileType, enum: AvikastFileType, required: true},
  user: {type: String, ref: UserSchema.name, required: true},
  file: {type: String, ref: FileSchema.name},
  parent: {type: String, ref: schemaName},
});

export default interface AvikastFileModel extends Document {
  name: string;
  type: AvikastFileType;
  user: UserModel | string;
  file: FileModel | string | undefined;
}

export interface CreateAvikastFileModel {
  name: string;
  type: AvikastFileType;
  user: string;
  file: string | undefined;
  parent: string | undefined;
}
