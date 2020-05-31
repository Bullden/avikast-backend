import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class ProducerOptions {
  constructor(id: string, kind: object, rtpParameters: object) {
    this.id = id;
    this.kind = kind;
    this.rtpParameters = rtpParameters;
  }

  @Field(() => String)
  id: string;

  @Field(() => graphqlTypeJson)
  kind: object;

  @Field(() => graphqlTypeJson)
  rtpParameters: object;
}
