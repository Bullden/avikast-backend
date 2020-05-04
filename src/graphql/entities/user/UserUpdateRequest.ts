import { Field, InputType } from 'type-graphql';

import { IsDate, IsEmail, IsString, Length } from 'class-validator';

@InputType()
export default class UserUpdateRequest {
  constructor(name: string, birthday: Date, email: string) {
    this.name = name;
    this.birthday = birthday;
    this.email = email;
  }

  @Field(() => String)
  @IsString()
  @Length(3, 30)
  name: string;

  @Field()
  @IsDate()
  birthday: Date;

  @Field()
  @IsEmail()
  email: string;
}
