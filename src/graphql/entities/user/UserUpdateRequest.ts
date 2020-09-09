import {Field, InputType} from '@nestjs/graphql';

@InputType()
export default class UserUpdateRequest {
  constructor(
    name: string | undefined,
    email: string | undefined,
    country: string | undefined,
    city: string | undefined,
    position: string | undefined,
    telephone: string | undefined,
    dateOfBirth: Date | undefined,
    tags: string[] | undefined,
    skills: string[] | undefined,
    mission: string[] | undefined,
    vision: string[] | undefined,
    interests: string[] | undefined,
  ) {
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.position = position;
    this.telephone = telephone;
    this.dateOfBirth = dateOfBirth;
    this.tags = tags;
    this.skills = skills;
    this.mission = mission;
    this.vision = vision;
    this.interests = interests;
  }

  @Field(() => String, {nullable: true})
  name: string | undefined;

  @Field(() => String, {nullable: true})
  email: string | undefined;

  @Field(() => String, {nullable: true})
  country: string | undefined;

  @Field(() => String, {nullable: true})
  city: string | undefined;

  @Field(() => String, {nullable: true})
  position: string | undefined;

  @Field(() => String, {nullable: true})
  telephone: string | undefined;

  @Field(() => Date, {nullable: true})
  dateOfBirth: Date | undefined;

  @Field(() => [String], {nullable: true})
  tags: string[] | undefined;

  @Field(() => [String], {nullable: true})
  skills: string[] | undefined;

  @Field(() => [String], {nullable: true})
  mission: string[] | undefined;

  @Field(() => [String], {nullable: true})
  vision: string[] | undefined;

  @Field(() => [String], {nullable: true})
  interests: string[] | undefined;

  @Field(() => String, {nullable: true})
  referralCode: string | undefined;
}
