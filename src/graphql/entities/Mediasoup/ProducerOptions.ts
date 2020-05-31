import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class ProducerOptions {
  constructor(roomId: string, producerId: string, kind: string, rtpParameters: object) {
    this.roomId = roomId;
    this.producerId = producerId;
    this.kind = kind;
    this.rtpParameters = rtpParameters;
  }

  @Field(() => String)
  roomId: string;

  @Field(() => String)
  producerId: string;

  @Field(() => String)
  kind: string;

  @Field(() => graphqlTypeJson)
  rtpParameters: object;
}
