import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import {RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import {
  mapMessagesToGQL,
  mapParticipantsToGQL,
  mapRoomToGQL,
} from 'graphql/entities/Mappers';
import Participant from 'graphql/entities/room/Participant';
import Message from '../entities/message/Message';

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

  @Query(() => [Participant])
  async participants(@CurrentSession() session: Session, @Args('roomId') roomId: string) {
    return mapParticipantsToGQL(
      await this.roomManager.getParticipants(session.userId, roomId),
    );
  }

  @Query(() => [Message])
  async messagesByRoom(@Args({name: 'roomId', type: () => String}) roomId: string) {
    return mapMessagesToGQL(await this.roomManager.getMessagesByRoom(roomId));
  }

  @Query(() => Boolean)
  async createTestMessage() {
    return this.roomManager.createTestMessage();
  }
}
