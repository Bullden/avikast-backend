import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import Message from '../entities/message/Message';
import {mapMessagesToGQL, mapMessageToGQL} from '../entities/Mappers';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import IMessageManager from '../../managers/message/IMessageManager';
import {PubSubEngine} from 'graphql-subscriptions';
import Ignore from '../../enhancers/decorators/Ignore';
import {Subscription as RxSubscription} from 'rxjs';
import SessionInfo from 'entities/SessionInfo';

const EVENT_NEW_MESSAGE = 'NEW_MESSAGE';

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

  @Query(() => Message)
  async messageById(@Args({name: 'messageId', type: () => String}) messageId: string) {
    return mapMessageToGQL(await this.chatManager.getMessageById(messageId));
  }

  @Mutation(() => Message)
  async createMessage(
    @CurrentSession() session: SessionInfo,
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

  private messageCreatedSubscription: RxSubscription | undefined;

  @Ignore('AppType', 'Platform')
  @Subscription(() => Message, {
    filter: (newMessage: Message, {roomId}: {roomId: string}) =>
      roomId === newMessage.roomId,
    resolve: (newMessage: Message) => newMessage,
  })
  async messageAdded(
    @Args({name: 'roomId', type: () => String}) _roomId: string,
    @Args({name: 'userId', type: () => String}) _userId: string,
  ) {
    if (!this.messageCreatedSubscription) {
      this.messageCreatedSubscription = this.chatManager
        .messageCreatedObservable()
        .subscribe(async (newMessage) =>
          this.pubSub.publish(EVENT_NEW_MESSAGE, newMessage),
        );
    }
    return this.pubSub.asyncIterator(EVENT_NEW_MESSAGE);
  }
}
