import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {RoomType} from 'entities/Room';

registerEnumType(RoomType, {name: 'RoomType'});

@ObjectType()
export default class Room {
  constructor(id: string, name: string, type: RoomType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => RoomType)
  type: RoomType;
}
