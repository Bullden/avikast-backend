import Ban from 'database/entities/Ban';

export default interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  dateOfBirth: Date;
  avatarUrl: string;
  tags: string[];
  skills: string[];
  allowNotifications: boolean;
  referralCode: string;
  referrer: User | undefined;
  ban: Ban | undefined;
}
