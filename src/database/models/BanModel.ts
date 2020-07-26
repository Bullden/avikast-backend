import {Document} from 'mongoose';
import {createSchema} from './Common';

const schemaName = 'ban';

export const BanSchema = createSchema(schemaName, {
  id: {type: String, required: true},
  untilDate: {type: Date, required: false},
  isForever: {type: Boolean, required: false},
});

export default interface BanModel extends Document {
  untilDate: Date;
  isForever: boolean;
}
