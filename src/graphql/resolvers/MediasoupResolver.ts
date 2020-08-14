import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import TransportOptions from '../entities/mediasoup/TransportOptions';
import graphqlTypeJson from 'graphql-type-json';
import ConsumerOptions from '../entities/mediasoup/ConsumerOptions';
import RouterOptions from 'graphql/entities/mediasoup/RouterOptions';
import ProducerOptions from 'graphql/entities/mediasoup/ProducerOptions';
import IMediasoupManager from 'managers/mediasoup/IMediasoupManager';
import {Direction, MediaKind, MediaType, PlayingType} from 'entities/Mediasoup';
import {mapProducersToGQL, mapProducerToGQL} from 'graphql/entities/Mappers';
import {PubSub} from 'graphql-subscriptions';
import SessionInfo from 'entities/SessionInfo';
import IRoomManager from 'managers/room/IRoomManager';

@Resolver()
export default class MediasoupResolver {
  constructor(
    private readonly mediasoupManager: IMediasoupManager,
    private readonly roomManager: IRoomManager,
  ) {}

  @Mutation(() => TransportOptions)
  async createTransport(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
    @Args('direction') direction: string,
    @Args('clientId') clientId: string,
  ): Promise<TransportOptions> {
    return this.mediasoupManager.createTransport(
      roomId,
      session.userId,
      direction as Direction,
      clientId,
    );
  }

  @Mutation(() => Boolean)
  async connectTransport(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
    @Args({name: 'dtlsParameters', type: () => graphqlTypeJson}) dtlsParameters: object,
    @Args('direction') direction: string,
    @Args('clientId') clientId: string,
  ): Promise<boolean> {
    await this.mediasoupManager.connectTransport(
      roomId,
      dtlsParameters,
      direction as Direction,
      clientId,
    );
    return true;
  }

  @Mutation(() => ProducerOptions)
  async createProducer(
    @CurrentSession() session: SessionInfo,
    @Args('transportId') transportId: string,
    @Args('roomId') roomId: string,
    @Args('clientId') clientId: string,
    @Args({name: 'rtpParameters', type: () => graphqlTypeJson}) rtpParameters: object,
    @Args({name: 'mediaKind', type: () => MediaKind}) mediaKind: MediaKind,
    @Args({name: 'mediaType', type: () => MediaType}) mediaType: MediaType,
  ): Promise<ProducerOptions> {
    const pubSub = new PubSub();
    pubSub.asyncIterator('participantTrackChanged');
    const producer = await this.mediasoupManager.createProducer(
      roomId,
      transportId,
      clientId,
      session.userId,
      rtpParameters,
      mediaKind,
      mediaType,
    );
    return mapProducerToGQL(producer);
  }

  @Mutation(() => ConsumerOptions)
  async createConsumer(
    @CurrentSession() session: SessionInfo,
    @Args('producerId') producerId: string,
    @Args('roomId') roomId: string,
    @Args({name: 'rtpCapabilities', type: () => graphqlTypeJson}) rtpCapabilities: object,
    @Args('clientId') clientId: string,
  ): Promise<ConsumerOptions> {
    return this.mediasoupManager.createConsumer(
      roomId,
      producerId,
      rtpCapabilities,
      clientId,
      session.userId,
    );
  }

  @Query(() => RouterOptions)
  async getRouter(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
  ): Promise<RouterOptions> {
    return this.mediasoupManager.getRouter(roomId);
  }

  @Query(() => ProducerOptions)
  async getProducer(
    @CurrentSession() session: SessionInfo,
    @Args('roomId') roomId: string,
  ): Promise<ProducerOptions> {
    const producer = await this.mediasoupManager.getProducer(roomId, session.userId);
    return mapProducerToGQL(producer);
  }

  @Query(() => [ProducerOptions])
  async getProducers(@Args('roomId') roomId: string): Promise<ProducerOptions[]> {
    const producers = await this.mediasoupManager.getProducers(roomId);
    return mapProducersToGQL(producers);
  }

  @Query(() => Boolean)
  async startRecording(
    @Args('roomId') roomId: string,
    @Args({name: 'producerId', type: () => String, nullable: true})
    producerId: string | undefined,
    @Args({name: 'audioProducerId', type: () => String, nullable: true})
    audioProducerId: string | undefined,
    @CurrentSession() session: SessionInfo,
  ): Promise<boolean> {
    return this.mediasoupManager.startRecording(
      roomId,
      session.userId,
      producerId,
      audioProducerId,
    );
  }

  @Query(() => Boolean)
  async stopRecording(
    @Args({name: 'roomId', type: () => String, nullable: true})
    roomId: string | undefined,
    @Args({name: 'producerId', type: () => String, nullable: true})
    producerId: string | undefined,
    @Args({name: 'audioProducerId', type: () => String, nullable: true})
    audioProducerId: string | undefined,
    @CurrentSession() session: SessionInfo,
  ): Promise<boolean> {
    return this.mediasoupManager.stopRecording(
      session.userId,
      roomId,
      producerId,
      audioProducerId,
    );
  }

  @Mutation(() => Boolean)
  async playPauseMedia(
    @Args('media') media: PlayingType,
    @Args('status') status: boolean,
    @Args('roomId') roomId: string,
    @CurrentSession() session: SessionInfo,
  ): Promise<void> {
    return this.roomManager.playPauseMedia(media, status, roomId, session.userId);
  }
}
