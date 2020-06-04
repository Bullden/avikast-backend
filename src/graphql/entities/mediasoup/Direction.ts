import {Field, InputType} from '@nestjs/graphql';

@InputType()
export default class Direction {
  constructor(direction: string) {
    this.direction = direction;
  }

  @Field(() => String)
  direction: string;
}
