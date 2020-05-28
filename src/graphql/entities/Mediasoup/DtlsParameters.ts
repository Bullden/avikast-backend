import {Field, InputType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@InputType()
export default class DtlsParameters {
  constructor(role: object, fingerprints: object) {
    this.role = role;
    this.fingerprints = fingerprints;
  }

  @Field(() => graphqlTypeJson)
  role: object;

  @Field(() => graphqlTypeJson)
  fingerprints: object;
}
