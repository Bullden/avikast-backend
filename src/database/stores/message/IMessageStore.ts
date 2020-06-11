import Message from 'database/entities/Message';

export default abstract class IMessageStore {
  abstract createMessage(message: {
    senderId: string;
    chatId: string;
    body: string;
    date: string;
    receiverId: string | undefined;
  }): Promise<Message>;
}
