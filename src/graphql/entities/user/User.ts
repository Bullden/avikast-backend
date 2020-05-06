import {Field, ID, ObjectType} from '@nestjs/graphql';
import AdditionalUserInfo from './AdditionalUserInfo';

@ObjectType()
export default class User {
  constructor(id: string, name: string, additionalUserInfo?: AdditionalUserInfo) {
    this.id = id;
    this.name = name;
    this.additionalUserInfo = additionalUserInfo;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => AdditionalUserInfo, {nullable: true})
  additionalUserInfo: AdditionalUserInfo | undefined;
}
