import {ID} from './Common';

export default interface Ban {
  id: ID;
  untilDate?: Date;
  isForever?: boolean;
}
