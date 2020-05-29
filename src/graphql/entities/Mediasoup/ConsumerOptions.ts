import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class ConsumerOptions {
  constructor(id: string, producerId: string, rtpParameters: object) {
    this.id = id;
    this.producerId = producerId;
    this.rtpParameters = rtpParameters;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  producerId: string;

  @Field(() => graphqlTypeJson)
  rtpParameters: object;
}
