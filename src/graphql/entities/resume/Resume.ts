// eslint-disable-next-line max-classes-per-file
import {Field, InputType, ObjectType} from '@nestjs/graphql';

@InputType()
export class ResumeInput {
  constructor(summary: string, experience: string, education: string, awards: string) {
    this.summary = summary;
    this.experience = experience;
    this.education = education;
    this.awards = awards;
  }

  @Field(() => String)
  summary: string;

  @Field(() => String)
  experience: string;

  @Field(() => String)
  education: string;

  @Field(() => String)
  awards: string;
}

@ObjectType()
export class ResumeOutput {
  constructor(summary: string, experience: string, education: string, awards: string) {
    this.summary = summary;
    this.experience = experience;
    this.education = education;
    this.awards = awards;
  }

  @Field(() => String)
  summary: string;

  @Field(() => String)
  experience: string;

  @Field(() => String)
  education: string;

  @Field(() => String)
  awards: string;
}
