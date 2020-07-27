import {Field, InputType} from '@nestjs/graphql';

@InputType()
export default class UserUpdateRequest {
  constructor(
    name: string | undefined,
    email: string | undefined,
    country: string | undefined,
    city: string | undefined,
    dateOfBirth: Date | undefined,
    tags: string[] | undefined,
    skills: string[] | undefined,
  ) {
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.dateOfBirth = dateOfBirth;
    this.tags = tags;
    this.skills = skills;
  }

  @Field(() => String, {nullable: true})
  name: string | undefined;

  @Field(() => String, {nullable: true})
  email: string | undefined;

  @Field(() => String, {nullable: true})
  country: string | undefined;

  @Field(() => String, {nullable: true})
  city: string | undefined;

  @Field(() => Date, {nullable: true})
  dateOfBirth: Date | undefined;

  @Field(() => [String], {nullable: true})
  tags: string[] | undefined;

  @Field(() => [String], {nullable: true})
  skills: string[] | undefined;

  @Field(() => String, {nullable: true})
  referralCode: string | undefined;
}
