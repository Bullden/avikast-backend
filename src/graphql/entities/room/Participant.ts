import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {ParticipantRole} from 'entities/Participant';
import User from '../user/User';

registerEnumType(ParticipantRole, {name: 'ParticipantRole'});

@ObjectType()
export default class Participant {
  constructor(id: string, user: User, role: ParticipantRole) {
    this.id = id;
    this.user = user;
    this.role = role;
  }

  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => ParticipantRole)
  role: ParticipantRole;
}
