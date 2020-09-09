import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class User {
  constructor(
    id: string,
    name: string,
    email: string,
    country: string,
    city: string,
    position: string,
    telephone: string,
    dateOfBirth: Date | null,
    avatarUrl: string,
    tags: string[],
    skills: string[],
    vision: string[],
    mission: string[],
    interests: string[],
    referralCode: string,
    banUntilDate: Date | undefined,
    banForever: boolean | undefined,
    referrer: User | undefined,
    logoUrl: string | undefined,
    backgroundUrl: string | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.position = position;
    this.telephone = telephone;
    this.dateOfBirth = dateOfBirth;
    this.avatarUrl = avatarUrl;
    this.tags = tags;
    this.skills = skills;
    this.vision = vision;
    this.mission = mission;
    this.interests = interests;
    this.referralCode = referralCode;
    this.banUntilDate = banUntilDate;
    this.banForever = banForever;
    this.referrer = referrer;
    this.logoUrl = logoUrl;
    this.backgroundUrl = backgroundUrl;
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
  position: string;

  @Field(() => String)
  telephone: string;

  @Field(() => String, {nullable: true})
  dateOfBirth: Date | null;

  @Field(() => String)
  avatarUrl: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  skills: string[];

  @Field(() => [String])
  mission: string[];

  @Field(() => [String])
  vision: string[];

  @Field(() => [String])
  interests: string[];

  @Field(() => String)
  referralCode: string;

  @Field(() => Date, {nullable: true})
  banUntilDate?: Date;

  @Field(() => Boolean, {nullable: true})
  banForever?: Boolean;

  @Field(() => User, {nullable: true})
  referrer?: User;

  @Field(() => String, {nullable: true})
  logoUrl?: string;

  @Field(() => String, {nullable: true})
  backgroundUrl?: string;
}
