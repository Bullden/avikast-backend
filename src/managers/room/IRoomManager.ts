import Room, {RoomType} from 'entities/Room';
import {
  ConsumerOptions,
  ProducerOptions,
  TransportOptions,
  RouterOptions,
} from 'entities/Mediasoup';

export default abstract class IRoomManager {
  abstract createRoom(
    userId: string,
    name: string,
    type: RoomType,
    passwordProtected: boolean,
    password: string | undefined,
  ): Promise<Room>;

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

  abstract findProducerByRoomId(roomId: string): Promise<ProducerOptions>;

  abstract getRouterCapabilitiesByRoomId(roomId: string): Promise<RouterOptions>;
}
