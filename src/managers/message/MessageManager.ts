import {Injectable} from '@nestjs/common';
import IMessageManager from './IMessageManager';
import IMessageStore from '../../database/stores/message/IMessageStore';
import {mapMessageFromDB, mapMessagesFromDB} from '../../database/entities/Mappers';

@Injectable()
export default class MessageManager extends IMessageManager {
  constructor(private readonly messageStore: IMessageStore) {
    super();
  }

  async getMessagesByRoom(roomId: string) {
    if (!(await this.messageStore.getMessagesByRoom(roomId)))
      throw new Error("Message's array is empty");
    return mapMessagesFromDB(await this.messageStore.getMessagesByRoom(roomId));
  }

  async createTestMessage() {
    return mapMessageFromDB(await this.messageStore.createTestMessage());
  }

  async createMessage(sender: string, roomId: string, body: string, receiverId?: string) {
    const currentTime = new Date();
    const date = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    const message = {sender, roomId, body, date, receiverId};
    return mapMessageFromDB(await this.messageStore.createMessage(message));
  }
}
