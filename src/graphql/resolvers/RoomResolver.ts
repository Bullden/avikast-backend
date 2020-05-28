import {Args, Mutation, Resolver} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import {RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import TransportOptions from '../entities/Mediasoup/TransportOptions';
import DtlsParameters from '../entities/Mediasoup/DtlsParameters';

@Resolver()
export default class RoomResolver {
  constructor(private readonly mediasoupManager: IRoomManager) {}

  @Mutation(() => Room)
  async createRoom(
    @CurrentSession() session: Session,
    @Args('name') name: string,
    @Args({name: 'type', type: () => RoomType}) type: RoomType,
  ): Promise<Room> {
    return this.mediasoupManager.createRoom(session.userId, name, type);
  }

  @Mutation(() => TransportOptions)
  async createTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<TransportOptions> {
    return this.mediasoupManager.createTransport(session.userId, roomId);
  }

  @Mutation(() => Boolean)
  async connectTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
    @Args('dtlsParameters') dtlsParameters: DtlsParameters,
  ): Promise<boolean> {
    // eslint-disable-next-line no-console
    console.log(roomId, dtlsParameters, 'dtlsParameters');
    return this.mediasoupManager.connectTransport(roomId, dtlsParameters);
  }
}
