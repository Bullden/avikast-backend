import { Field, ID, ObjectType } from 'type-graphql';
import AdditionalUserInfo from './AdditionalUserInfo';

@ObjectType()
export default class User {
  constructor(
    id: string,
    name: string,
    birthday: Date,
    additionalUserInfo?: AdditionalUserInfo,
  ) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.additionalUserInfo = additionalUserInfo;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field()
  birthday: Date;

  @Field(() => AdditionalUserInfo, { nullable: true })
  additionalUserInfo: AdditionalUserInfo | undefined;
}
