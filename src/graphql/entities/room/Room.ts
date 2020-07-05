import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {RoomType} from 'entities/Room';
import graphqlTypeJson from 'graphql-type-json';
import {MediaType} from 'entities/Mediasoup';
import WebinarOptions from 'graphql/entities/room/WebinarOptions';

registerEnumType(RoomType, {name: 'RoomType'});

@ObjectType()
export default class Room {
  constructor(id: string, name: string, inviteLink: string, type: RoomType) {
    this.id = id;
    this.name = name;
    this.inviteLink = inviteLink;
    this.type = type;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  inviteLink: string;

  @Field(() => RoomType)
  type: RoomType;
}
