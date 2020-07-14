import User from 'entities/User';

export default interface Record {
  id: string;
  name: string;
  date: Date;
  fileId: string;
  user: User;
}
