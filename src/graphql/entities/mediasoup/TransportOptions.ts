import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class TransportOptions {
  constructor(
    id: string,
    iceCandidates: object,
    iceParameters: object,
    dtlsParameters: object,
  ) {
    this.id = id;
    this.iceCandidates = iceCandidates;
    this.iceParameters = iceParameters;
    this.dtlsParameters = dtlsParameters;
  }

  @Field(() => String)
  id: string;

  @Field(() => graphqlTypeJson)
  iceCandidates: object;

  @Field(() => graphqlTypeJson)
  iceParameters: object;

  @Field(() => graphqlTypeJson)
  dtlsParameters: object;
}
