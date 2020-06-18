import {Injectable} from '@nestjs/common';
import IMessageManager from './IMessageManager';
import IMessageStore from '../../database/stores/message/IMessageStore';
import {mapMessageFromDB, mapMessagesFromDB} from 'database/entities/Mappers';
import {Observable} from 'rxjs';
import Message from 'entities/Message';
import DbMessage from 'database/entities/Message';

@Injectable()
export default class MessageManager extends IMessageManager {
  constructor(private readonly messageStore: IMessageStore) {
    super();
    this.watchNewMessage();
  }

  async getMessagesByRoom(roomId: string) {
    if (!(await this.messageStore.getMessagesByRoom(roomId)))
      throw new Error("Message's array is empty");
    return mapMessagesFromDB(await this.messageStore.getMessagesByRoom(roomId));
  }

  async createMessage(sender: string, roomId: string, body: string, receiverId?: string) {
    const currentTime = new Date();
    const date = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    const message = {sender, roomId, body, date, receiverId};
    return mapMessageFromDB(await this.messageStore.createMessage(message));
  }

  watchNewMessage(): Observable<Message> {
    return this.messageStore
      .watchNewMessage()
      .lift((m: DbMessage) => mapMessageFromDB(m));
  }
}
