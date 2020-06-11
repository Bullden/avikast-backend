import IMessageStore from './IMessageStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import MessageModel, {CreateMessageModel, MessageSchema} from '../../models/MessageModel';
import {mapMessageFromModel} from '../../models/Mappers';

export default class MessageStore extends IMessageStore {
  constructor(
    @InjectModel(MessageSchema.name)
    private messageModel: Model<MessageModel>,
  ) {
    super();
  }

  async createMessage(message: {
    senderId: string;
    chatId: string;
    body: string;
    date: string;
    receiverId: string | undefined;
  }) {
    const newMessage: CreateMessageModel = {
      senderId: message.senderId,
      chatId: message.chatId,
      body: message.body,
      date: message.date,
      receiverId: message.receiverId,
    };
    const createdMessage = await this.messageModel.create(newMessage);
    return mapMessageFromModel(createdMessage);
  }
}
