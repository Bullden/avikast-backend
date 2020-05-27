import Room, {RoomType} from 'entities/Room';

export default abstract class IRoomManager {
  abstract createRoom(userId: string, name: string, type: RoomType): Promise<Room>;
}
