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

  watchNewMessage() {
    return new Observable<Message>((subscriber) => {
      console.log('stream');
      const stream = this.messageModel.watch().on('change', async (doc) => {
        console.log(doc);
        // receive message from db by id (using another method in this class)
        // call subscriber.next(...) with new message object
      });
    });
  }
}
