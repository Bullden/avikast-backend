import {Args, Mutation, Resolver} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';

@Resolver()
export default class RoomResolver {
  constructor(private readonly mediasoupManager: IRoomManager) {}

  @Mutation(() => Boolean)
  async createRoom(@Args('name') name: string) {
    console.log('RESOLVER!!!!!!!');
    await this.mediasoupManager.createRoom(name);
  }
}
