import IMessageStore from './IMessageStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import MessageModel, {CreateMessageModel, MessageSchema} from '../../models/MessageModel';
import {mapMessageFromModel, mapMessagesFromModel} from '../../models/Mappers';

export default class MessageStore extends IMessageStore {
  constructor(
    @InjectModel(MessageSchema.name)
    private messageModel: Model<MessageModel>,
  ) {
    super();
  }

  async createMessage(message: {
    senderId: string;
    roomId: string;
    body: string;
    date: string;
    receiverId: string | undefined;
  }) {
    const newMessage: CreateMessageModel = {
      senderId: message.senderId,
      roomId: message.roomId,
      body: message.body,
      date: message.date,
      receiverId: message.receiverId,
    };
    const createdMessage = await this.messageModel.create(newMessage);
    return mapMessageFromModel(createdMessage);
  }

  async createTestMessage() {
    const newMessage: CreateMessageModel = {
      senderId: 'SUPER TEST',
      roomId: 'SUPER TEST',
      body: 'SUPER TEST',
      date: 'SUPER TEST',
      receiverId: 'SUPER TEST',
    };
    const createdMessage = await this.messageModel.create(newMessage);
    return mapMessageFromModel(createdMessage);
  }

  async getMessagesByRoom(roomId: string) {
    const messages = await this.messageModel.find({roomId});
    return mapMessagesFromModel(messages);
  }
}
