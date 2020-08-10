export default interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  dateOfBirth: Date | null;
  avatarUrl: string;
  tags: string[];
  skills: string[];
  allowNotifications: boolean;
  referralCode: string;
  referrer: User | undefined;
  banUntilDate: Date | undefined;
  banForever: boolean | undefined;
}
