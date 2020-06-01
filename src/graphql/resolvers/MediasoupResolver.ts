import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import TransportOptions from '../entities/mediasoup/TransportOptions';
import graphqlTypeJson from 'graphql-type-json';
import ConsumerOptions from '../entities/mediasoup/ConsumerOptions';
import RouterOptions from 'graphql/entities/mediasoup/RouterOptions';
import ProducerOptions from 'graphql/entities/mediasoup/ProducerOptions';
import IMediasoupManager from 'managers/mediasoup/IMediasoupManager';

@Resolver()
export default class MediasoupResolver {
  constructor(private readonly mediasoupManager: IMediasoupManager) {}

  @Mutation(() => TransportOptions)
  async createTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
    @Args('direction') direction: string,
  ): Promise<TransportOptions> {
    return this.mediasoupManager.createTransport(
      session.userId,
      roomId,
      direction as 'send' | 'receive',
    );
  }

  @Mutation(() => Boolean)
  async connectTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
    @Args({name: 'dtlsParameters', type: () => graphqlTypeJson}) dtlsParameters: object,
    @Args('direction') direction: string,
  ): Promise<boolean> {
    await this.mediasoupManager.connectTransport(
      roomId,
      dtlsParameters,
      direction as 'send' | 'receive',
    );
    return true;
  }

  @Mutation(() => ProducerOptions)
  async createProducer(
    @CurrentSession() session: Session,
    @Args('transportId') transportId: string,
    @Args('roomId') roomId: string,
    @Args({name: 'rtpParameters', type: () => graphqlTypeJson}) rtpParameters: object,
  ): Promise<ProducerOptions> {
    return this.mediasoupManager.createProducer(transportId, roomId, rtpParameters);
  }

  @Mutation(() => ConsumerOptions)
  async createConsumer(
    @CurrentSession() session: Session,
    @Args('producerId') producerId: string,
    @Args('roomId') roomId: string,
    @Args({name: 'rtpCapabilities', type: () => graphqlTypeJson}) rtpCapabilities: object,
  ): Promise<ConsumerOptions> {
    return this.mediasoupManager.createConsumer(producerId, roomId, rtpCapabilities);
  }

  @Query(() => RouterOptions)
  async getRouter(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<RouterOptions> {
    return this.mediasoupManager.getRouter(roomId);
  }
}
