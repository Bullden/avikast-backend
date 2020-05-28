import {ID} from './Common';

export default class User {
  constructor(
    id: ID,
    name: string,
    email: string,
    country: string,
    city: string,
    dateOfBirth: Date,
    avatarUrl: string,
    tags: string[],
    skills: string[],
    referralCode: string,
    referrer: User | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.dateOfBirth = dateOfBirth;
    this.avatarUrl = avatarUrl;
    this.tags = tags;
    this.skills = skills;
    this.referralCode = referralCode;
    this.referrer = referrer;
  }

  id: ID;

  name: string;

  email: string;

  country: string;

  city: string;

  dateOfBirth: Date;

  avatarUrl: string;

  tags: string[];

  skills: string[];

  referralCode: string;

  referrer: User | undefined;
}
