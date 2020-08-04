import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import {MuteAction, MuteSource, RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import {
  mapParticipantsToGQL,
  mapParticipantsTracksToGQL,
  mapParticipantToGQL,
  mapRoomsToGQL,
  mapRoomToGQL,
} from 'graphql/entities/Mappers';
import Participant from 'graphql/entities/room/Participant';
import ParticipantMedia from 'graphql/entities/room/ParticipantMedia';
import {PubSub, PubSubEngine} from 'graphql-subscriptions';
import SessionInfo from 'entities/SessionInfo';
import Ignore from 'enhancers/decorators/Ignore';
import {Subscription as RxSubscription} from 'rxjs/dist/types/internal/Subscription';

const EVENT_ROOM_UPDATED = 'EVENT_ROOM_UPDATED';

@Resolver(() => Room)
export default class RoomResolver {
  constructor(
    private readonly roomManager: IRoomManager,
    private readonly pubSub: PubSubEngine,
  ) {}

  @Mutation(() => Room)
  async createRoom(
    @CurrentSession() session: SessionInfo,
    @Args('name') name: string,
    @Args({name: 'type', type: () => RoomType}) type: RoomType,
    @Args({name: 'passwordProtected', type: () => Boolean}) passwordProtected: boolean,
    @Args({name: 'password', type: () => String, nullable: true})
    password: string | undefined,
  ): Promise<Room> {
    const room = await mapRoomToGQL(
      await this.roomManager.createRoom(
        session.userId,
        name,
        type,
        passwordProtected,
        password,
      ),
    );
    return room;
  }

  @Query(() => [Room])
  async rooms() {
    return mapRoomsToGQL(await this.roomManager.getRooms());
  }

  @Mutation(() => Boolean)
  async deleteRooms(
    @Args({name: 'roomIds', type: () => [String]}) roomIds: string[],
  ): Promise<Boolean> {
    await this.roomManager.deleteRooms(roomIds);

    return true;
  }

  @Mutation(() => Room)
  async joinRoom(
    @CurrentSession() session: SessionInfo,
    @Args('inviteLink') inviteLink: string,
    @Args({name: 'password', type: () => String, nullable: true}) password: string,
  ) {
    return mapRoomToGQL(
      await this.roomManager.joinRoom(session.userId, inviteLink, password),
    );
  }

  @Query(() => Room)
  async roomById(@CurrentSession() session: SessionInfo, @Args('roomId') roomId: string) {
    return mapRoomToGQL(await this.roomManager.getRoomById(session.userId, roomId));
  }

  @Query(() => Room, {nullable: true})
  async room(@CurrentSession() session: SessionInfo) {
    const roomFromManager = await this.roomManager.getRoomByUserId(session.userId);
    if (roomFromManager === undefined) {
      return undefined;
    }
    return mapRoomToGQL(roomFromManager);
  }

  @ResolveField(() => [Participant], {name: 'participants'})
  async participantsResolveField(
    // @Parent() createRoom: Room,
    @Parent() room: Room,
  ) {
    const participants = await this.roomManager.getParticipants(
      'session.userId',
      room.id,
    );
    return mapParticipantsToGQL(participants);
  }

  @Query(() => [Participant])
  async participants(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
  ) {
    return mapParticipantsToGQL(
      await this.roomManager.getParticipants(session.userId, roomId),
    );
  }

  @Query(() => [ParticipantMedia])
  async participantsTracks(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
  ) {
    const pubSub = new PubSub();
    const tracks = await this.roomManager.getParticipantsTracks(session.userId, roomId);
    const mapTracks = mapParticipantsTracksToGQL(tracks);
    await pubSub.publish('participantTrackChanged', {mapTracks});
    return mapTracks;
  }

  @Query(() => Participant)
  async webinarOwner(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
  ) {
    const webinarOwner = await this.roomManager.getWebinarOwner(session.userId, roomId);
    return mapParticipantToGQL(webinarOwner);
  }

  @Query(() => String)
  async inviteLinkByRoomById(@Args('roomId') roomId: string) {
    return this.roomManager.getInviteLink(roomId);
  }

  @Mutation(() => Boolean)
  async raiseHand(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
    @Args('raiseHand') raiseHand: boolean,
  ) {
    return this.roomManager.raiseHand(roomId, session.userId, raiseHand);
  }

  @Mutation(() => Boolean)
  async leaveRoom(
    @Args('roomId') roomId: string,
    @CurrentSession() session: SessionInfo,
  ) {
    return this.roomManager.leaveRoom(roomId, session.userId);
  }

  @Mutation(() => Boolean)
  async closeRoom(@Args('roomId') roomId: string) {
    return this.roomManager.closeRoom(roomId);
  }

  private roomUpdatedSubscription: RxSubscription | undefined;

  // RoomSub
  @Ignore('AppType', 'Platform')
  @Subscription(() => Room, {
    resolve: (room: Room) => room,
  })
  async roomSub(
    @Args({
      name: 'roomId',
      type: () => String,
    })
    _roomId: string,
  ) {
    if (!this.roomUpdatedSubscription) {
      this.roomUpdatedSubscription = this.roomManager
        .roomObservable()
        .subscribe(async (room) => {
          return this.pubSub.publish(EVENT_ROOM_UPDATED, room);
        });
    }
    return this.pubSub.asyncIterator(EVENT_ROOM_UPDATED);
  }

  // endregion

  @Mutation(() => Boolean)
  async mute(
    @CurrentSession() session: SessionInfo,
    @Args('action') action: MuteAction,
    @Args('source') source: MuteSource,
    @Args('userId') userId: string,
    @Args('roomId') roomId: string,
    @Args('producerId') producerId: string,
  ) {
    return this.roomManager.mute(
      action,
      source,
      userId,
      session.userId,
      roomId,
      producerId,
    );
  }

  @Mutation(() => Boolean)
  async muteAll(
    @CurrentSession() session: SessionInfo,
    @Args('action') action: MuteAction,
    @Args('userId') userId: string,
    @Args('roomId') roomId: string,
  ) {
    return this.roomManager.muteAll(action, userId, session.userId, roomId);
  }

  @Mutation(() => Boolean)
  async kick(
    @CurrentSession() session: SessionInfo,
    @Args('userId') userId: string,
    @Args('roomId') roomId: string,
  ) {
    return this.roomManager.kick(session.userId, userId, roomId);
  }
}
