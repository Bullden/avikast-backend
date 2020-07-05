import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {ParticipantRole} from 'entities/Participant';
import User from '../user/User';
import ParticipantMedia from 'graphql/entities/room/ParticipantMedia';
import WebinarOptions from 'graphql/entities/room/WebinarOptions';

registerEnumType(ParticipantRole, {name: 'ParticipantRole'});

@ObjectType()
export default class Participant {
  constructor(
    id: string,
    user: User,
    role: ParticipantRole,
    media: ParticipantMedia,
    webinarOptions: WebinarOptions | undefined,
  ) {
    this.id = id;
    this.user = user;
    this.role = role;
    this.media = media;
    this.webinarOptions = webinarOptions;
  }

  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => ParticipantRole)
  role: ParticipantRole;

  @Field(() => ParticipantMedia)
  media: ParticipantMedia;

  @Field(() => WebinarOptions, {nullable: true})
  webinarOptions: WebinarOptions | undefined;
}
