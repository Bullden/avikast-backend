import {Document} from 'mongoose';
import {createSchema} from './Common';
import {AvikastFileType} from '../../entities/AvikastFile';
import UserModel, {UserSchema} from './UserModel';

const schemaName = 'avikastFile';

export const AvikastFileSchema = createSchema(schemaName, {
  name: {type: String, required: true},
  type: {type: AvikastFileType, enum: AvikastFileType, required: true},
  user: {type: String, ref: UserSchema.name},
});

export default interface AvikastFileModel extends Document {
  name: string;
  type: AvikastFileType;
  user: UserModel | string;
}
