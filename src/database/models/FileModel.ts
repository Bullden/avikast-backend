import {Document} from 'mongoose';
import {createSchema} from './Common';

const schemaName = 'file';

export const FileSchema = createSchema(schemaName, {
  mediaLink: {type: String, required: true},
  name: {type: String, required: true},
  mimeType: {type: String, required: true},
});

export default interface FileModel extends Document {
  mediaLink: string;
  name: string;
  mimeType: string;
}

export interface CreateFileModel {
  mediaLink: string;
  name: string;
  mimeType: string;
}
