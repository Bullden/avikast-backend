import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import Session from 'entities/Session';
import Message from '../entities/message/Message';
import {mapMessagesToGQL, mapMessageToGQL} from '../entities/Mappers';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import IMessageManager from '../../managers/message/IMessageManager';
import {PubSubEngine} from 'graphql-subscriptions';
import Ignore from '../../enhancers/decorators/Ignore';

const EVENT_NEW_MESSAGE = 'NEW_MESSAGE';

@Resolver()
export default class MessageResolver {
  constructor(
    private readonly chatManager: IMessageManager,
    private readonly pubSub: PubSubEngine,
  ) {}

  @Query(() => [Message])
  async messagesByRoom(
    @CurrentSession() session: Session,
    @Args({name: 'roomId', type: () => String}) roomId: string,
  ) {
    return mapMessagesToGQL(
      await this.chatManager.getMessagesByRoom(roomId, session.userId),
    );
  }

  @Query(() => Message)
  async messageById(
    @CurrentSession() session: Session,
    @Args({name: 'messageId', type: () => String}) messageId: string,
  ) {
    return mapMessageToGQL(
      await this.chatManager.getMessageById(messageId, session.userId),
    );
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

  @Ignore('AppType', 'Platform')
  @Subscription(() => Message)
  async messageAdded(
    @Args({name: 'roomId', type: () => String}) roomId: string,
    @Args({name: 'userId', type: () => String}) userId: string,
  ) {
    this.watchMessage(roomId, userId);
    return this.pubSub.asyncIterator(EVENT_NEW_MESSAGE);
  }

  private watchMessage(roomId: string, userId: string) {
    this.chatManager.watchNewMessage().subscribe(async (newMessage) => {
      if (roomId === newMessage.roomId) {
        await this.pubSub.publish(EVENT_NEW_MESSAGE, {
          messageAdded: {...newMessage, isMe: userId === newMessage.sender.id},
        });
      }
    });
  }
}
