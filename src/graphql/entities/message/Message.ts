import {Field, ID, ObjectType} from '@nestjs/graphql';
import User from '../user/User';

@ObjectType()
export default class Message {
  constructor(
    id: string,
    sender: User,
    roomId: string,
    body: string,
    date: string,
    receiverId: string | undefined,
  ) {
    this.id = id;
    this.sender = sender;
    this.roomId = roomId;
    this.body = body;
    this.date = date;
    this.receiverId = receiverId;
  }

  @Field(() => ID)
  id: string;

  @Field(() => User)
  sender: User;

  @Field(() => String)
  roomId: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  receiverId: string | undefined;
}
