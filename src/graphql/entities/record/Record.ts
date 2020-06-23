import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class Record {
  constructor(id: string, name: string, date: Date, time: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.time = time;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  time: string;
}
