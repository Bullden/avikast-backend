import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class AdditionalUserInfo {
  constructor(phoneNumber: string, email: string) {
    this.email = email;
  }

  @Field(() => String)
  email: string;
}
