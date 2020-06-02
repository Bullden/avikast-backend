import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import {RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import {mapRoomToGQL} from 'graphql/entities/Mappers';

@Resolver()
export default class RoomResolver {
  constructor(private readonly roomManager: IRoomManager) {}

  @Mutation(() => Room)
  async createRoom(
    @CurrentSession() session: Session,
    @Args('name') name: string,
    @Args({name: 'type', type: () => RoomType}) type: RoomType,
    @Args({name: 'passwordProtected', type: () => Boolean}) passwordProtected: boolean,
    @Args({name: 'password', type: () => String, nullable: true})
    password: string | undefined,
  ): Promise<Room> {
    return mapRoomToGQL(
      await this.roomManager.createRoom(
        session.userId,
        name,
        type,
        passwordProtected,
        password,
      ),
    );
  }

  @Mutation(() => Room)
  async joinRoom(
    @CurrentSession() session: Session,
    @Args('code') code: string,
    @Args({name: 'password', type: () => String, nullable: true}) password: string,
  ) {
    return mapRoomToGQL(await this.roomManager.joinRoom(session.userId, code, password));
  }

  @Query(() => Room)
  async roomById(@CurrentSession() session: Session, @Args('roomId') roomId: string) {
    return mapRoomToGQL(await this.roomManager.getRoomById(session.userId, roomId));
  }
}
