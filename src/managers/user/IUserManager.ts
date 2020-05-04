import Client from 'entities/Client';
import { ID } from 'entities/Common';

export default abstract class IUserManager {
  abstract updateClientInformation(
    id: ID,
    name: string,
    birthday: Date,
    email: string,
  ): Promise<void>;

  abstract getClients(): Promise<Client[]>;

  abstract getClientById(id: ID): Promise<Client | undefined>;
}
