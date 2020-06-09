import {ID} from './Common';
import {AvikastFileType} from 'entities/AvikastFile';
import User from './User';

export default interface AvikastFile {
  id: ID;
  name: string;
  type: AvikastFileType;
  user: User;
}
