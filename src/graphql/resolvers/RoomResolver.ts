import {Args, Mutation, Resolver} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import {RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';

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
}
