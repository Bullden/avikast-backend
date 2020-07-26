import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';

@InputType('BanInput')
@ObjectType()
export default class Ban {
  constructor(id: string, untilDate: Date, isForever: boolean) {
    this.id = id;
    this.untilDate = untilDate;
    this.isForever = isForever;
  }

  @Field(() => ID)
  id: string;

  @Field(() => Date, {nullable: true})
  untilDate?: Date;

  @Field(() => Boolean, {nullable: true})
  isForever?: boolean;
}
