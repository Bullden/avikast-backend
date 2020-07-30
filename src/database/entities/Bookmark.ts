import User from './User';

export default interface Bookmark {
  id: string;
  date: Date;
  topic: string;
  text: string;
  user: User;
}
