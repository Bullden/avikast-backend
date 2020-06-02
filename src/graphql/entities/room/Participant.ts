import Room from './Room';
import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {ParticipantRole} from 'entities/Participant';
import User from '../user/User';

registerEnumType(ParticipantRole, {name: 'ParticipantRole'});

@ObjectType()
export default class Participant {
  constructor(id: string, user: User, room: Room, role: ParticipantRole) {
    this.id = id;
    this.user = user;
    this.room = room;
    this.role = role;
  }

  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => Room)
  room: Room;

  @Field(() => ParticipantRole)
  role: ParticipantRole;
}
