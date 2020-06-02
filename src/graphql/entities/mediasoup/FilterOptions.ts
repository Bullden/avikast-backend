import {Field, ObjectType} from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export default class FilterOptions {
  constructor(filter: object) {
    this.filter = filter;
  }

  @Field(() => graphqlTypeJson)
  filter: object;
}
