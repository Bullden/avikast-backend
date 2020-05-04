import User from '../../entities/User';
import { ID } from 'entities/Common';
import Client from '../../entities/Client';
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

  abstract updatePreferences(
    userId: ID,
    allowNotifications: boolean,
  ): Promise<void>;

  abstract createAdminIfNotExists(userId: ID): Promise<Admin>;

  abstract getAdminByUserId(userId: ID): Promise<Admin | undefined>;

  abstract getClientById(id: string): Promise<Client | undefined>;

  abstract createClientIfNotExists(userId: ID): Promise<Client>;

  abstract getClients(): Promise<Client[]>;

  abstract updateClientInformation(
    id: string,
    name: string,
    birthday: Date,
    email: string,
  ): Promise<void>;
}
