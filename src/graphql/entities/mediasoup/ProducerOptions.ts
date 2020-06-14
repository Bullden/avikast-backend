import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class ProducerOptions {
  constructor(id: string, kind: string, rtpParameters: object, clientId: string) {
    this.id = id;
    this.kind = kind;
    this.rtpParameters = rtpParameters;
    this.clientId = clientId;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  kind: string;

  @Field(() => graphqlTypeJson)
  rtpParameters: object;

  @Field(() => String)
  clientId: string;
}
