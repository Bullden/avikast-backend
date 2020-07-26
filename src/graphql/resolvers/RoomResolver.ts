import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import {MuteAction, MuteSource, RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import {
  mapParticipantsToGQL,
  mapParticipantsTracksToGQL,
  mapParticipantToGQL,
  mapRoomToGQL,
} from 'graphql/entities/Mappers';
import Participant from 'graphql/entities/room/Participant';
import ParticipantMedia from 'graphql/entities/room/ParticipantMedia';
import {PubSub, PubSubEngine} from 'graphql-subscriptions';
import Session from 'entities/Session';
import Ignore from 'enhancers/decorators/Ignore';
import {Subscription as RxSubscription} from 'rxjs/dist/types/internal/Subscription';

const EVENT_NEW_PARTICIPANT_TRACK = 'NEW_PARTICIPANT_TRACK';

@Resolver()
export default class RoomResolver {
  constructor(
    private readonly roomManager: IRoomManager,
    private readonly pubSub: PubSubEngine,
  ) {}

  @Mutation(() => Room)
  async createRoom(
    @CurrentSession() session: Session,
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

  @Mutation(() => Room)
  async joinRoom(
    @CurrentSession() session: Session,
    @Args('inviteLink') inviteLink: string,
    @Args({name: 'password', type: () => String, nullable: true}) password: string,
  ) {
    return mapRoomToGQL(
      await this.roomManager.joinRoom(session.userId, inviteLink, password),
    );
  }

  @Query(() => Room)
  async roomById(@CurrentSession() session: Session, @Args('roomId') roomId: string) {
    return mapRoomToGQL(await this.roomManager.getRoomById(session.userId, roomId));
  }

  @Query(() => Room, {nullable: true})
  async room(@CurrentSession() session: Session) {
    const roomFromManager = await this.roomManager.getRoomByUserId(session.userId);
    if (roomFromManager === undefined) {
      return undefined;
    }
    return mapRoomToGQL(roomFromManager);
  }

  @Query(() => [Participant])
  async participants(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ) {
    return mapParticipantsToGQL(
      await this.roomManager.getParticipants(session.userId, roomId),
    );
  }

  @Query(() => [ParticipantMedia])
  async participantsTracks(
    @CurrentSession() session: Session,
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
    @CurrentSession() session: Session,
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
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
    @Args('raiseHand') raiseHand: boolean,
  ) {
    return this.roomManager.raiseHand(roomId, session.userId, raiseHand);
  }

  @Mutation(() => Boolean)
  async leaveRoom(
    @Args('roomId') roomId: string,
    @CurrentSession() session: Session,
  ) {
    return this.roomManager.leaveRoom(roomId, session.userId);
  }

  @Mutation(() => Boolean)
  async closeRoom(@Args('roomId') roomId: string) {
    return this.roomManager.closeRoom(roomId);
  }

  private trackCreatedSubscription: RxSubscription | undefined;

  // SUB
  @Ignore('AppType', 'Platform')
  @Subscription(() => [ParticipantMedia], {
    resolve: (participantTracks: ParticipantMedia[]) => participantTracks,
  })
  async participantsTracksSub(
    @Args({
      name: 'roomId',
      type: () => String,
    })
    _roomId: string,
    @Args({
      name: 'userId',
      type: () => String,
    })
    _userId: string,
  ) {
    if (!this.trackCreatedSubscription) {
      console.log(_roomId, _userId);
      this.trackCreatedSubscription = this.roomManager
        .participantsTracksObservable()
        .subscribe(async (participantTrack) =>
          this.pubSub.publish(EVENT_NEW_PARTICIPANT_TRACK, participantTrack),
        );
    }
    return this.pubSub.asyncIterator(EVENT_NEW_PARTICIPANT_TRACK);
  }

  @Mutation(() => Boolean)
  async mute(
    @CurrentSession() session: Session,
    @Args('action') action: MuteAction,
    @Args('source') source: MuteSource,
    @Args('userId') userId: string,
    @Args('roomId') roomId: string,
  ) {
    return this.roomManager.mute(action, source, userId, session.userId, roomId);
  }
}
