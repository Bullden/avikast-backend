import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class ProducerOptions {
  constructor(id: string, kind: string, rtpParameters: object, appData: object) {
    this.id = id;
    this.kind = kind;
    this.rtpParameters = rtpParameters;
    this.appData = appData;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  kind: string;

  @Field(() => graphqlTypeJson)
  rtpParameters: object;

  @Field(() => graphqlTypeJson)
  appData: object;
}
