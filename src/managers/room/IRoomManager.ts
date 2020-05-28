import Room, {RoomType} from 'entities/Room';
import TransportOptions from '../../entities/TransportOptions';
import DtlsParameters from '../../entities/DtlsParameters';

export default abstract class IRoomManager {
  abstract createRoom(userId: string, name: string, type: RoomType): Promise<Room>;

  abstract createTransport(userId: string, roomId: string): Promise<TransportOptions>;

  abstract connectTransport(
    roomId: string,
    dtlsParameters: DtlsParameters,
  ): Promise<boolean>;
}
