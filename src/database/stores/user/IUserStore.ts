import User from '../../entities/User';
import {ID} from 'entities/Common';

export default abstract class IUserStore {
  abstract createUser(user: Partial<User>): Promise<User>;

  abstract updateUser(
    userId: ID,
    data: {
      name: string;
      email: string;
    },
  ): Promise<void>;

  abstract getUser(userId: ID): Promise<User | undefined>;
}
