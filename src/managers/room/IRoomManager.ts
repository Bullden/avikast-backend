import Room, {RoomType} from 'entities/Room';
import TransportOptions from '../../entities/TransportOptions';

export default abstract class IRoomManager {
  abstract createRoom(userId: string, name: string, type: RoomType): Promise<Room>;

  abstract createTransport(name: string): Promise<TransportOptions>;
}
