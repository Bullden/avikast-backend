import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
import {MediaKind, MediaType, ProducerOptions} from 'entities/Mediasoup';
import graphqlTypeJson from 'graphql-type-json';

registerEnumType(MediaKind, {name: 'MediaKind'});
registerEnumType(MediaType, {name: 'MediaType'});

@ObjectType()
export default class ParticipantTrackOptions {
  constructor(
    enabled: boolean,
    clientId: string | undefined,
    options: ProducerOptions | undefined,
    mediaKind: MediaKind | undefined,
    mediaType: MediaType | undefined,
  ) {
    this.enabled = enabled;
    this.clientId = clientId;
    this.options = options;
    this.mediaKind = mediaKind;
    this.mediaType = mediaType;
  }

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => String, {nullable: true})
  clientId: string | undefined;

  @Field(() => graphqlTypeJson, {nullable: true})
  options: object | undefined;

  @Field(() => String, {nullable: true})
  mediaKind: MediaKind | undefined;

  @Field(() => String, {nullable: true})
  mediaType: MediaType | undefined;
}
