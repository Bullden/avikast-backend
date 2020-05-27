import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {RoomType} from 'entities/Room';
// noinspection TypeScriptCheckImport
import graphqlTypeJson from 'graphql-type-json';

registerEnumType(RoomType, {name: 'RoomType'});

@ObjectType()
export default class Room {
  constructor(id: string, name: string, type: RoomType, rtpCapabilities: object) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.rtpCapabilities = rtpCapabilities;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => RoomType)
  type: RoomType;

  @Field(() => graphqlTypeJson)
  rtpCapabilities: object;
}
