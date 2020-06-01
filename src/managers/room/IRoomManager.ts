import Room, {RoomType} from 'entities/Room';
import {
  ConsumerOptions,
  TransportOptions,
  RouterOptions,
  ProducerOptions,
} from 'entities/Mediasoup';

export default abstract class IRoomManager {
  abstract createRoom(
    userId: string,
    name: string,
    type: RoomType,
    passwordProtected: boolean,
    password: string | undefined,
  ): Promise<Room>;

  abstract createTransport(
    userId: string,
    roomId: string,
    direction: 'send' | 'receive',
  ): Promise<TransportOptions>;

  abstract connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: 'send' | 'receive',
  ): Promise<void>;

  abstract createProducer(
    transportId: string,
    roomId: string,
    rtpParameters: object,
  ): Promise<ProducerOptions>;

  abstract createConsumer(
    producerId: string,
    roomId: string,
    rtpCapabilities: object,
  ): Promise<ConsumerOptions>;

  abstract getRouterCapabilitiesByRoomId(roomId: string): Promise<RouterOptions>;
}
