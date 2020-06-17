import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import Session from 'entities/Session';
import Message from '../entities/message/Message';
import {mapMessagesToGQL, mapMessageToGQL} from '../entities/Mappers';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import IChatManager from '../../managers/chat/IChatManager';

@Resolver()
export default class ChatResolver {
  constructor(private readonly chatManager: IChatManager) {}

  @Query(() => [Message])
  async messagesByRoom(@Args({name: 'roomId', type: () => String}) roomId: string) {
    return mapMessagesToGQL(await this.chatManager.getMessagesByRoom(roomId));
  }

  @Mutation(() => Message)
  async createTestMessage() {
    const message = await this.chatManager.createTestMessage();
    return mapMessageToGQL(message);
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
}
