import { ID } from './Common';
import { IsString } from 'class-validator';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';

export default class User {
  constructor(
    id: string,
    name: string,
    birthday: Date,
    additionalUserInfo: AdditionalUserInfo | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.additionalUserInfo = additionalUserInfo;
  }

  id: ID;

  @IsString()
  name: string;

  birthday: Date;

  additionalUserInfo: AdditionalUserInfo | undefined;
}
