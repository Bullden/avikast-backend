import {Observable} from 'rxjs';
import Message from 'database/entities/Message';

export default abstract class IMessageStore {
  abstract createMessage(message: {
    sender: string;
    roomId: string;
    body: string;
    receiverId?: string | undefined;
  }): Promise<Message>;

  abstract getMessagesByRoom(roomId: string): Promise<Message[]>;

  abstract getMessageById(messageId: unknown): Promise<Message | null>;

  abstract watchMessageCreated(): Observable<Message>;
}
