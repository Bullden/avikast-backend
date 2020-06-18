import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import Session from 'entities/Session';
import Message from '../entities/message/Message';
import {mapMessagesToGQL} from '../entities/Mappers';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import IMessageManager from '../../managers/message/IMessageManager';
import {PubSubEngine} from 'graphql-subscriptions';

const EVENT_NAME = 'EVENT_NAME';

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

  @Subscription(() => Boolean)
  messageAdded() {
    return this.pubSub.asyncIterator(EVENT_NAME);
  }

  @Mutation(() => Boolean)
  async ping() {
    const pingId = Date.now();
    await this.pubSub.publish(EVENT_NAME, {[EVENT_NAME]: {pingId}});
    return true;
  }

  // private watchNewMessage() {
  //   this.chatManager.watchNewMessage().subscribe((message) => {
  //     // console.log(message);
  //     // call pubsub
  //   });
  // }
}
