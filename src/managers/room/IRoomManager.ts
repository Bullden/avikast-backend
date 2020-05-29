import Room, {RoomType} from 'entities/Room';
import TransportOptions from '../../entities/TransportOptions';

export default abstract class IRoomManager {
  abstract createRoom(userId: string, name: string, type: RoomType): Promise<Room>;

  abstract createTransport(userId: string, roomId: string): Promise<TransportOptions>;

  abstract connectTransport(roomId: string, dtlsParameters: object): Promise<void>;

  abstract sendTrack(
    transportId: string,
    roomId: string,
    kind: string,
    rtpParameters: object,
  ): Promise<string>;
}
