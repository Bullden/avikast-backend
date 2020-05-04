import User from '../../entities/User';
import { ID } from 'entities/Common';
import Admin from 'database/entities/Admin';

export interface GetCouriersFilter {
  withoutActiveOrders?: true;
}

export default abstract class IUserStore {
  abstract createUser(user: Partial<User>): Promise<User>;

  abstract updateUser(
    userId: ID,
    data: {
      name: string;
      birthday: Date;
      email: string;
    },
  ): Promise<void>;

  abstract getUser(userId: ID): Promise<User | undefined>;

  abstract createAdminIfNotExists(userId: ID): Promise<Admin>;

  abstract getAdminByUserId(userId: ID): Promise<Admin | undefined>;

  abstract createUserIfNotExists(userId: ID): Promise<User>;
}
