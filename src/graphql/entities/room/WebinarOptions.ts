import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
import {MediaKind, MediaType} from 'entities/Mediasoup';
import {ViewModeEnum, ViewModeScale} from 'entities/Room';

registerEnumType(MediaKind, {name: 'ViewModeEnum'});
registerEnumType(MediaType, {name: 'ViewModeScale'});

@ObjectType()
export default class WebinarOptions {
  constructor(viewMode: ViewModeEnum, viewModeScale: ViewModeScale) {
    this.viewMode = viewMode;
    this.viewModeScale = viewModeScale;
  }

  @Field(() => String)
  viewMode: ViewModeEnum;

  @Field(() => String)
  viewModeScale: ViewModeScale;
}
