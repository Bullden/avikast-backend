import {RoomType} from 'entities/Room';
import Room from 'database/entities/Room';

export default abstract class IRoomStore {
  abstract createRoom(room: {
    name: string;
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
  }): Promise<Room>;

  abstract findRoomByIdOrThrow(id: string): Promise<Room>;

  abstract findRoomByUser(userId: string): Promise<Room | null>;
}
