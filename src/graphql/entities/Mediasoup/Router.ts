import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class Router {
  @Field(() => Object)
  rtpCapabilities: Object;

  constructor(rtpCapabilities: any) {
    this.rtpCapabilities = rtpCapabilities;
  }
}
