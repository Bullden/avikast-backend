import {IsNotEmpty, IsString} from 'class-validator';

export default class RegisterRequest {
  constructor(name: string, email: string, password: string, referralCode: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.referralCode = referralCode;
  }

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  referralCode: string;
}
