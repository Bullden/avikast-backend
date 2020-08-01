import {ID} from './Common';
import {AvikastFileType} from 'entities/AvikastFile';
import User from './User';
import File from './File';

export default interface AvikastFile {
  id: ID;
  name: string;
  type: AvikastFileType;
  user: User;
  file: File | undefined;
}
