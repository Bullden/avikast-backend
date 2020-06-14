import {Field, ObjectType} from '@nestjs/graphql';
import {ProducerOptions} from 'entities/Mediasoup';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class ParticipantTrackOptions {
  constructor(
    enabled: boolean,
    options: ProducerOptions | undefined,
    mediaKind: string | undefined,
    mediaType: string | undefined,
  ) {
    this.enabled = enabled;
    this.options = options;
    this.mediaKind = mediaKind;
    this.mediaType = mediaType;
  }

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => graphqlTypeJson, {nullable: true})
  options: object | undefined;

  @Field(() => String, {nullable: true})
  mediaKind: string | undefined;

  @Field(() => String, {nullable: true})
  mediaType: string | undefined;
}
