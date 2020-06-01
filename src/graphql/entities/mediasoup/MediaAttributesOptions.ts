import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class MediaAttributesOptions {
  constructor(kind: string, mediaType: string, direction: string) {
    this.kind = kind;
    this.mediaType = mediaType;
    this.direction = direction;
  }

  @Field(() => String)
  kind: string;

  @Field(() => String)
  mediaType: string;

  @Field(() => String)
  direction: string;
}
