import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {ParticipantRole} from 'entities/Participant';
import User from '../user/User';
import ParticipantMedia from 'graphql/entities/room/ParticipantMedia';

registerEnumType(ParticipantRole, {name: 'ParticipantRole'});

@ObjectType()
export default class Participant {
  constructor(
    id: string,
    user: User,
    role: ParticipantRole,
    media: ParticipantMedia,
    raiseHand: boolean | undefined,
    kicked: boolean,
    muted: boolean,
  ) {
    this.id = id;
    this.user = user;
    this.role = role;
    this.media = media;
    this.raiseHand = raiseHand;
    this.kicked = kicked;
    this.muted = muted;
  }

  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => ParticipantRole)
  role: ParticipantRole;

  @Field(() => ParticipantMedia)
  media: ParticipantMedia;

  @Field(() => Boolean, {nullable: true})
  raiseHand: boolean | undefined;

  @Field(() => Boolean)
  kicked: boolean;

  @Field(() => Boolean)
  muted: boolean;
}
