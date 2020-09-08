import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from 'database/models/UserModel';

const schemaName = 'resume';

export const ResumeSchema = createSchema(schemaName, {
  summary: {type: String, required: false},
  experience: {type: String, required: false},
  education: {type: String, required: false},
  awards: {type: String, required: false},
  user: {type: String, ref: UserSchema.name},
});

export default interface ResumeModel extends Document {
  summary: string;
  experience: string;
  education: string;
  awards: string;
  user: UserModel | string;
}
export interface CreateResumeModel {
  summary: string;
  experience: string;
  education: string;
  awards: string;
  userId: string;
}
