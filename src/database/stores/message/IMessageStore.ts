import Message from 'database/entities/Message';

export default abstract class IMessageStore {
  abstract createMessage(message: {
    senderId: string;
    roomId: string;
    body: string;
    date: string;
    receiverId: string | undefined;
  }): Promise<Message>;

  abstract getMessagesByRoom(roomId: string): Promise<Message[]>;

  abstract createTestMessage(): Promise<boolean>;
}
