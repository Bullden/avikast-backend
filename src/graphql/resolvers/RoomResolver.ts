import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import {RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import {
  mapParticipantsToGQL,
  mapParticipantsTracksToGQL,
  mapParticipantToGQL,
  mapRoomToGQL,
} from 'graphql/entities/Mappers';
import Participant from 'graphql/entities/room/Participant';
import ParticipantMedia from 'graphql/entities/room/ParticipantMedia';
import {PubSub} from 'graphql-subscriptions';
import SessionInfo from 'entities/SessionInfo';

@Resolver()
export default class RoomResolver {
  constructor(private readonly roomManager: IRoomManager) {}

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
}
