export default interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  position: string;
  telephone: string;
  dateOfBirth: Date | null;
  avatarUrl: string;
  tags: string[];
  skills: string[];
  vision: string[];
  mission: string[];
  interests: string[];
  allowNotifications?: boolean | undefined;
  referralCode: string;
  referrer: User | undefined;
  banUntilDate: Date | undefined;
  banForever: boolean | undefined;
  logoUrl: string | undefined;
  backgroundUrl: string | undefined;
  resumeUrl: string | undefined;
}
