import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import User from '../user/User';
import {AvikastFileType} from '../../../entities/AvikastFile';

registerEnumType(AvikastFileType, {name: 'AvikastFileType'});

@ObjectType()
export default class AvikastFile {
  constructor(id: string, name: string, user: User, type: AvikastFileType) {
    this.id = id;
    this.name = name;
    this.user = user;
    this.type = type;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => User)
  user: User;

  @Field(() => AvikastFileType)
  type: AvikastFileType;
}
