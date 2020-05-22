import {ID} from './Common';

export default class User {
  constructor(
    id: string,
    name: string,
    email: string,
    country: string,
    city: string,
    dateOfBirth: Date,
    avatarUrl: string,
    tags: string[],
    skills: string[],
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
}
