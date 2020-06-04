import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import TransportOptions from '../entities/mediasoup/TransportOptions';
import graphqlTypeJson from 'graphql-type-json';
import ConsumerOptions from '../entities/mediasoup/ConsumerOptions';
import RouterOptions from 'graphql/entities/mediasoup/RouterOptions';
import ProducerOptions from 'graphql/entities/mediasoup/ProducerOptions';
import IMediasoupManager from 'managers/mediasoup/IMediasoupManager';
import {Direction} from 'entities/Mediasoup';

@Resolver()
export default class MediasoupResolver {
  constructor(private readonly mediasoupManager: IMediasoupManager) {}

  @Mutation(() => TransportOptions)
  async createTransport(
    @CurrentSession() session: Session,
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
    @CurrentSession() session: Session,
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
    @CurrentSession() session: Session,
    @Args('transportId') transportId: string,
    @Args('roomId') roomId: string,
    @Args({name: 'rtpParameters', type: () => graphqlTypeJson}) rtpParameters: object,
    @Args('clientId') clientId: string,
  ): Promise<ProducerOptions> {
    return this.mediasoupManager.createProducer(
      roomId,
      session.userId,
      transportId,
      rtpParameters,
      clientId,
    );
  }

  @Mutation(() => ConsumerOptions)
  async createConsumer(
    @CurrentSession() session: Session,
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
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<RouterOptions> {
    return this.mediasoupManager.getRouter(roomId);
  }

  @Query(() => ProducerOptions)
  async getProducer(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<ProducerOptions> {
    return this.mediasoupManager.getProducer(roomId, session.userId);
  }

  @Query(() => ProducerOptions)
  async getProducers(@Args('roomId') roomId: string): Promise<ProducerOptions[]> {
    return this.mediasoupManager.getProducers(roomId);
  }
}
