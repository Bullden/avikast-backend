import {ID} from './Common';

export default class Message {
  constructor(
    id: ID,
    senderId: string,
    chatId: string,
    body: string,
    date: string,
    receiverId: string | undefined,
  ) {
    this.id = id;
    this.senderId = senderId;
    this.chatId = chatId;
    this.body = body;
    this.date = date;
    this.receiverId = receiverId;
  }

  id: ID;

  senderId: string;

  chatId: string;

  body: string;

  date: string;

  receiverId: string | undefined;
}
