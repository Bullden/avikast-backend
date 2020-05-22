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
}
