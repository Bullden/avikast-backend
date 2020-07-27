import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {RoomType} from 'entities/Room';
import User from 'graphql/entities/user/User';

registerEnumType(RoomType, {name: 'RoomType'});

@ObjectType()
export default class Room {
  constructor(
    id: string,
    closed: undefined | Date,
    name: string,
    inviteLink: string,
    type: RoomType,
    user: User,
  ) {
    this.id = id;
    this.closed = closed;
    this.name = name;
    this.inviteLink = inviteLink;
    this.type = type;
    this.user = user;
  }

  @Field(() => ID)
  id: string;

  @Field(() => Date, {nullable: true})
  closed: undefined | Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  inviteLink: string;

  @Field(() => RoomType)
  type: RoomType;

  @Field(() => User)
  user: User;
}
