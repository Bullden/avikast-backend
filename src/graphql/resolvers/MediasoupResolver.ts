import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import TransportOptions from '../entities/mediasoup/TransportOptions';
import graphqlTypeJson from 'graphql-type-json';
import ConsumerOptions from '../entities/mediasoup/ConsumerOptions';
import RouterOptions from 'graphql/entities/mediasoup/RouterOptions';
import ProducerOptions from 'graphql/entities/mediasoup/ProducerOptions';
import IMediasoupManager from 'managers/mediasoup/IMediasoupManager';
import MediaAttributesOptions from 'graphql/entities/mediasoup/MediaAttributesOptions';
import {mapMediaAttributes} from '../entities/Mappers';

@Resolver()
export default class MediasoupResolver {
  constructor(private readonly mediasoupManager: IMediasoupManager) {}

  @Mutation(() => TransportOptions)
  async createTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
    @Args('mediaAttributes') mediaAttributes: MediaAttributesOptions,
  ): Promise<TransportOptions> {
    return this.mediasoupManager.createTransport(
      session.userId,
      roomId,
      mapMediaAttributes(mediaAttributes),
    );
  }

  @Mutation(() => Boolean)
  async connectTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
    @Args({name: 'dtlsParameters', type: () => graphqlTypeJson}) dtlsParameters: object,
    @Args('mediaAttributes') mediaAttributes: MediaAttributesOptions,
  ): Promise<boolean> {
    await this.mediasoupManager.connectTransport(
      roomId,
      dtlsParameters,
      mapMediaAttributes(mediaAttributes),
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
    return this.mediasoupManager.createProducer(
      session.userId,
      transportId,
      roomId,
      rtpParameters,
    );
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

  @Query(() => ProducerOptions)
  async findProducer(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<ProducerOptions> {
    return this.mediasoupManager.findProducer(session.userId, roomId);
  }
}
