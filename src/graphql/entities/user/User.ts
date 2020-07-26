import {Field, ID, ObjectType} from '@nestjs/graphql';
import Ban from 'graphql/entities/ban/Ban';

@ObjectType()
export default class User {
  constructor(
    id: string,
    name: string,
    email: string,
    country: string,
    city: string,
    dateOfBirth: Date,
    avatarUrl: string,
    tags: string[],
    skills: string[],
    referralCode: string,
    ban: Ban,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.dateOfBirth = dateOfBirth;
    this.avatarUrl = avatarUrl;
    this.tags = tags;
    this.skills = skills;
    this.referralCode = referralCode;
    this.ban = ban;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  dateOfBirth: Date;

  @Field(() => String)
  avatarUrl: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  skills: string[];

  @Field(() => String)
  referralCode: string;

  @Field(() => Ban, {nullable: true})
  ban?: Ban;
}
