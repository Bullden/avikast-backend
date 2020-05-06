import {ID} from './Common';
import {IsString} from 'class-validator';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';

export default class User {
  constructor(
    id: string,
    name: string,
    additionalUserInfo: AdditionalUserInfo | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.additionalUserInfo = additionalUserInfo;
  }

  id: ID;

  @IsString()
  name: string;

  additionalUserInfo: AdditionalUserInfo | undefined;
}
