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
  referralCode: string;
}
