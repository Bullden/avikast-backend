import {Field, InputType} from '@nestjs/graphql';

@InputType()
export default class UserUpdateRequest {
  constructor(
    name: string,
    email: string,
    country: string,
    city: string,
    dateOfBirth: Date,
    avatarUrl: string,
    tags: string[],
    skills: string[],
  ) {
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.dateOfBirth = dateOfBirth;
    this.tags = tags;
    this.skills = skills;
  }

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => Date)
  dateOfBirth: Date;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  skills: string[];
}
