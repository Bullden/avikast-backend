import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class Message {
  constructor(
    id: string,
    senderId: string,
    roomId: string,
    body: string,
    date: string,
    receiverId: string | undefined,
  ) {
    this.id = id;
    this.senderId = senderId;
    this.roomId = roomId;
    this.body = body;
    this.date = date;
    this.receiverId = receiverId;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  senderId: string;

  @Field(() => String)
  roomId: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  receiverId: string | undefined;
}