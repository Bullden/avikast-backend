import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class Router {
  constructor(rtpCapabilities: object) {
    this.rtpCapabilities = rtpCapabilities;
  }

  @Field(() => Object)
  rtpCapabilities: object;
}
