import {Observable} from 'rxjs';
import Message from 'entities/Message';

export default abstract class IMessageManager {
  abstract getMessagesByRoom(roomId: string, userId: string): Promise<Message[]>;

  abstract createMessage(
    sender: string,
    roomId: string,
    body: string,
    receiverId?: string,
  ): Promise<Message>;

  abstract getMessageById(messageId: string, userId: string): Promise<Message>;

  abstract watchNewMessage(userId: string): Observable<Message>;
}
