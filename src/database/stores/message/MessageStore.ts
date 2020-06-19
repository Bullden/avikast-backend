import IMessageStore from './IMessageStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import MessageModel, {CreateMessageModel, MessageSchema} from '../../models/MessageModel';
import {mapMessageFromModel, mapMessagesFromModel} from '../../models/Mappers';
import {Observable} from 'rxjs';
import Message from 'database/entities/Message';

export default class MessageStore extends IMessageStore {
  constructor(
    @InjectModel(MessageSchema.name)
    private messageModel: Model<MessageModel>,
  ) {
    super();
  }

  private readonly populateMessage: QueryPopulateOptions = {
    path: 'sender',
  };

  async createMessage(message: {
    sender: string;
    roomId: string;
    body: string;
    date: string;
    receiverId?: string;
  }) {
    const newMessage: CreateMessageModel = {
      sender: message.sender,
      roomId: message.roomId,
      body: message.body,
      date: message.date,
      receiverId: message.receiverId,
    };
    const createdMessage = await this.messageModel.create(newMessage);
    return mapMessageFromModel(
      await createdMessage.populate(this.populateMessage).execPopulate(),
    );
  }

  async getMessagesByRoom(roomId: string) {
    const messages = await this.messageModel
      .find({roomId})
      .populate(this.populateMessage);
    return mapMessagesFromModel(messages);
  }

  async getMessageById(messageId: unknown) {
    const message = await this.messageModel
      .findOne({_id: messageId})
      .populate(this.populateMessage);
    return message ? mapMessageFromModel(message) : message;
  }

  watchNewMessage() {
    return new Observable<Message>((subscriber) => {
      this.messageModel.watch().on('change', async (doc) => {
        if (doc.operationType === 'insert') {
          const newMessage = await this.getMessageById(doc.documentKey._id);
          subscriber.next(newMessage || undefined);
        }
      });
    });
  }
}
