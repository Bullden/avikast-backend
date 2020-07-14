import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class Record {
  constructor(id: string, name: string, date: Date, fileId: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.fileId = fileId;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  fileId: string;
}
