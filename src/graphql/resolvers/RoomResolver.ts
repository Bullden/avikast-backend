import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import IRoomManager from '../../managers/room/IRoomManager';
import CurrentSession from 'enhancers/decorators/CurrentSession';
import Session from 'entities/Session';
import {RoomType} from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import TransportOptions from '../entities/mediasoup/TransportOptions';
import graphqlTypeJson from 'graphql-type-json';
import ConsumerOptions from '../entities/mediasoup/ConsumerOptions';
import ProducerOptions from '../entities/mediasoup/ProducerOptions';
import {mapRoomToGQL} from 'graphql/entities/Mappers';
import RouterOptions from 'graphql/entities/mediasoup/RouterOptions';

@Resolver()
export default class RoomResolver {
  constructor(private readonly mediasoupManager: IRoomManager) {}

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
      await this.mediasoupManager.createRoom(
        session.userId,
        name,
        type,
        passwordProtected,
        password,
      ),
    );
  }

  @Mutation(() => TransportOptions)
  async createTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<TransportOptions> {
    return this.mediasoupManager.createTransport(session.userId, roomId);
  }

  @Mutation(() => Boolean)
  async connectTransport(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
    @Args({name: 'dtlsParameters', type: () => graphqlTypeJson}) dtlsParameters: object,
  ): Promise<boolean> {
    // eslint-disable-next-line no-console
    console.log('connectTransport');
    await this.mediasoupManager.connectTransport(roomId, dtlsParameters);
    return true;
  }

  @Mutation(() => String)
  async sendTrack(
    @CurrentSession() session: Session,
    @Args('transportId') transportId: string,
    @Args('roomId') roomId: string,
    @Args({name: 'rtpParameters', type: () => graphqlTypeJson}) rtpParameters: object,
  ): Promise<string> {
    // eslint-disable-next-line no-console
    console.log('sendTrack');
    return this.mediasoupManager.sendTrack(transportId, roomId, rtpParameters);
  }

  @Mutation(() => ConsumerOptions)
  async createConsumer(
    @CurrentSession() session: Session,
    @Args('producerId') producerId: string,
    @Args('roomId') roomId: string,
    @Args({name: 'rtpCapabilities', type: () => graphqlTypeJson}) rtpCapabilities: object,
  ): Promise<ConsumerOptions> {
    // eslint-disable-next-line no-console
    return this.mediasoupManager.createConsumer(producerId, roomId, rtpCapabilities);
  }

  @Query(() => ProducerOptions)
  async findProducerByRoomId(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<ProducerOptions> {
    // eslint-disable-next-line no-console
    console.log(111, 'findProducerByRoomId', 111);
    return await this.mediasoupManager.findProducerByRoomId(roomId);
  }

  @Query(() => RouterOptions)
  async getRouterCapabilitiesByRoomId(
    @CurrentSession() session: Session,
    @Args('roomId') roomId: string,
  ): Promise<RouterOptions> {
    // eslint-disable-next-line no-console
    console.log(111, 'findProducerByRoomId', 111);
    const options = await this.mediasoupManager.getRouterCapabilitiesByRoomId(roomId);
    return options;
  }
}
