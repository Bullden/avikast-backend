import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class AdditionalUserInfo {
  constructor(phoneNumber: string, email: string) {
    this.email = email;
  }

  @Field(() => String)
  email: string;
}
