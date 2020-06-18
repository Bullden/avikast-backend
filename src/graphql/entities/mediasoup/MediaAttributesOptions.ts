import {Field, InputType, registerEnumType} from '@nestjs/graphql';
import {MediaKind, MediaType} from 'entities/Mediasoup';

registerEnumType(MediaKind, {name: 'MediaKind'});
registerEnumType(MediaType, {name: 'MediaType'});

@InputType()
export default class MediaAttributesOptions {
  constructor(kind: MediaKind, mediaType: MediaType, direction: string) {
    this.kind = kind;
    this.mediaType = mediaType;
    this.direction = direction;
  }

  @Field(() => MediaKind)
  kind: MediaKind;

  @Field(() => MediaType)
  mediaType: MediaType;

  @Field(() => String)
  direction: string;
}
