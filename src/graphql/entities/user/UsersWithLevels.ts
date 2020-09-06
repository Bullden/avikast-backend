import User from 'entities/User';

export default interface UsersWithLevels {
  level: number;
  user: User;
}

export interface UniqueOrder {
  level: number;
  user: User;
}
