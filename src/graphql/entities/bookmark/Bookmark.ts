import {Field, ID, ObjectType} from '@nestjs/graphql';
import User from '../user/User';

@ObjectType()
export default class Bookmark {
  constructor(id: string, date: Date, topic: string, text: string, user: User) {
    this.id = id;
    this.date = date;
    this.topic = topic;
    this.text = text;
    this.user = user;
  }

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  topic: string;

  @Field(() => String)
  text: string;

  @Field(() => User)
  user: User;
}
