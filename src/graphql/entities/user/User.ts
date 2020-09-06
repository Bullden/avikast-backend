import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class User {
  constructor(
    id: string,
    name: string,
    email: string,
    country: string,
    city: string,
    dateOfBirth: Date | null,
    avatarUrl: string,
    tags: string[],
    skills: string[],
    referralCode: string,
    banUntilDate: Date | undefined,
    banForever: boolean | undefined,
    referrer: User | undefined,
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
    this.banUntilDate = banUntilDate;
    this.banForever = banForever;
    this.referrer = referrer;
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

  @Field(() => String, {nullable: true})
  dateOfBirth: Date | null;

  @Field(() => String)
  avatarUrl: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  skills: string[];

  @Field(() => String)
  referralCode: string;

  @Field(() => Date, {nullable: true})
  banUntilDate?: Date;

  @Field(() => Boolean, {nullable: true})
  banForever?: Boolean;

  @Field(() => User, {nullable: true})
  referrer?: User;
}
