import Message from 'entities/Message';

export default abstract class IMessageManager {
  abstract getMessagesByRoom(roomId: string): Promise<Message[]>;

  abstract createTestMessage(): Promise<Message>;

  abstract createMessage(
    sender: string,
    roomId: string,
    body: string,
    receiverId?: string,
  ): Promise<Message>;
}
