import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export default class RegisterRequest {
  constructor(name: string, email: string, birthday: Date, password: string) {
    this.name = name;
    this.email = email;
    this.birthday = birthday;
    this.password = password;
  }

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  password: string;
}
