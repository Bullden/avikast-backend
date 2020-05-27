import {ID} from './Common';
import User from './User';
import {RoomType} from 'entities/Room';

export default interface Room {
  id: ID;
  name: string;
  type: RoomType;
  user: User;
}
