import IUserManager from 'managers/user/IUserManager';
import { Injectable } from '@nestjs/common';
import IUserStore from 'database/stores/user/IUserStore';
import { mapClientsFromDb, mapClientFromDb } from 'database/entities/Mappers';
import { ID } from 'entities/Common';
import ErrorHandler from '../../ErrorHandler';

@Injectable()
export default class UserManager extends IUserManager {
  constructor(private readonly userStore: IUserStore) {
    super();
  }

  async updateClientInformation(
    id: ID,
    name: string,
    birthday: Date,
    email: string,
  ) {
    await this.userStore.updateClientInformation(id, name, birthday, email);
  }

  async getClientById(id: ID) {
    const client = await this.userStore.getClientById(id);

    if (!client) throw new ErrorHandler('there is no such client');

    return mapClientFromDb(client);
  }

  async getClients() {
    const clients = await this.userStore.getClients();

    if (clients.length < 0) throw new ErrorHandler('no clients');

    return mapClientsFromDb(clients);
  }
}
