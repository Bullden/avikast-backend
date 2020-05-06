import {Field, InputType} from '@nestjs/graphql';

import {IsEmail, IsString, Length} from 'class-validator';

@InputType()
export default class UserUpdateRequest {
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  @Field(() => String)
  @IsString()
  @Length(3, 30)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
