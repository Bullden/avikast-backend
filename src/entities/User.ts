import {ID} from './Common';

export default class User {
  constructor(
    id: ID,
    name: string,
    email: string,
    country: string,
    city: string,
    position: string,
    telephone: string,
    dateOfBirth: Date | null,
    avatarUrl: string,
    tags: string[],
    skills: string[],
    mission: string[],
    vision: string[],
    interests: string[],
    referralCode: string,
    referrer: User | undefined,
    banUntilDate: Date | undefined,
    banForever: boolean | undefined,
    logoUrl: string | undefined,
    backgroundUrl: string | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.position = position;
    this.telephone = telephone;
    this.dateOfBirth = dateOfBirth;
    this.avatarUrl = avatarUrl;
    this.tags = tags;
    this.skills = skills;
    this.mission = mission;
    this.vision = vision;
    this.interests = interests;
    this.referralCode = referralCode;
    this.referrer = referrer;
    this.banUntilDate = banUntilDate;
    this.banForever = banForever;
    this.logoUrl = logoUrl;
    this.backgroundUrl = backgroundUrl;
  }

  id: ID;

  name: string;

  email: string;

  country: string;

  city: string;

  position: string;

  telephone: string;

  dateOfBirth: Date | null;

  avatarUrl: string;

  tags: string[];

  mission: string[];

  vision: string[];

  interests: string[];

  skills: string[];

  referralCode: string;

  referrer: User | undefined;

  banUntilDate: Date | undefined;

  banForever: boolean | undefined;

  logoUrl: string | undefined;

  backgroundUrl: string | undefined;
}
