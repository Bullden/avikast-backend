import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class GetRouterCapabilitiesByRoomId {
  constructor(rtpCapabilities: object) {
    this.rtpCapabilities = rtpCapabilities;
  }

  @Field(() => graphqlTypeJson)
  rtpCapabilities: object;
}
