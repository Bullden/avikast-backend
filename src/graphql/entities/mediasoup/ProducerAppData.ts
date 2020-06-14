import {Field, InputType} from '@nestjs/graphql';

@InputType()
export default class ProducerAppData {
  constructor(roomId: string, clientId: string, userId: string) {
    this.roomId = roomId;
    this.clientId = clientId;
    this.userId = userId;
  }

  @Field(() => String)
  roomId: string;

  @Field(() => String)
  clientId: string;

  @Field(() => String)
  userId: string;
}
