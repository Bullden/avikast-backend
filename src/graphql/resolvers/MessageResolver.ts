import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import Session from 'entities/Session';
import Message from '../entities/message/Message';
import {mapMessagesToGQL} from '../entities/Mappers';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import IMessageManager from '../../managers/message/IMessageManager';
import {PubSubEngine} from 'graphql-subscriptions';

@Resolver()
export default class MessageResolver {
  constructor(
    private readonly chatManager: IMessageManager,
    private readonly pubSub: PubSubEngine,
  ) {}

  @Query(() => [Message])
  async messagesByRoom(@Args({name: 'roomId', type: () => String}) roomId: string) {
    return mapMessagesToGQL(await this.chatManager.getMessagesByRoom(roomId));
  }

  @Mutation(() => Message)
  async createMessage(
    @CurrentSession() session: Session,
    @Args({name: 'roomId', type: () => String}) roomId: string,
    @Args({name: 'messageBody', type: () => String}) messageBody: string,
    @Args({name: 'receiverId', type: () => String, nullable: true}) receiverId: string,
  ) {
    return this.chatManager.createMessage(
      session.userId,
      roomId,
      messageBody,
      receiverId || '',
    );
  }

  private watchNewMessage() {
    this.chatManager.watchNewMessage().subscribe((message) => {
      console.log(message);
      // call pubsub
    });
  }
}
