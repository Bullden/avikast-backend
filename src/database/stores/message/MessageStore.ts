import IMessageStore from './IMessageStore';
import {InjectModel} from '@nestjs/mongoose';
import {ChangeStream, ChangeEvent} from 'mongodb';
import {Model, QueryPopulateOptions} from 'mongoose';
import MessageModel, {CreateMessageModel, MessageSchema} from '../../models/MessageModel';
import {mapMessageFromModel, mapMessagesFromModel} from '../../models/Mappers';
import {Subject} from 'rxjs';
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
    receiverId?: string;
  }) {
    const newMessage: CreateMessageModel = {
      sender: message.sender,
      roomId: message.roomId,
      body: message.body,
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

  // region Watch
  private changeStream: ChangeStream | undefined;

  private newMessageSubject: Subject<Message> | undefined;

  private watchInternal() {
    if (!this.changeStream) {
      const changeStream = this.messageModel.watch();
      changeStream.on('change', this.onChangeEventReceived.bind(this));
      this.changeStream = changeStream;
    }

    let newMessageSubject: Subject<Message>;
    if (this.newMessageSubject) {
      newMessageSubject = this.newMessageSubject;
    } else {
      newMessageSubject = new Subject<Message>();
      this.newMessageSubject = newMessageSubject;
    }

    return {newMessageSubject};
  }

  private async onChangeEventReceived(doc: ChangeEvent) {
    if (doc.operationType === 'insert') {
      const newMessage = await this.getMessageById(doc.documentKey._id);
      if (!newMessage) {
        throw new Error('Message does not exist');
      }
      if (this.newMessageSubject !== undefined) {
        this.newMessageSubject.next(newMessage);
      }
    }
  }

  // endregion

  watchMessageCreated() {
    const {newMessageSubject} = this.watchInternal();
    return newMessageSubject;
  }
}
