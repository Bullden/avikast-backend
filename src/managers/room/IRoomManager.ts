import Room, {RoomType} from 'entities/Room';
import TransportOptions from '../../entities/TransportOptions';
import ConsumerOptions from '../../entities/ConsumerOptions';

export default abstract class IRoomManager {
  abstract createRoom(userId: string, name: string, type: RoomType): Promise<Room>;

  abstract createTransport(userId: string, roomId: string): Promise<TransportOptions>;

  abstract connectTransport(roomId: string, dtlsParameters: object): Promise<void>;

  abstract sendTrack(
    transportId: string,
    roomId: string,
    rtpParameters: object,
  ): Promise<string>;

  abstract createConsumer(
    producerId: string,
    roomId: string,
    rtpCapabilities: object,
  ): Promise<ConsumerOptions>;
}
