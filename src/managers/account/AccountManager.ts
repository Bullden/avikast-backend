import {Injectable} from '@nestjs/common';
import IUserStore from '../../database/stores/user/IUserStore';
import IAccountManager from './IAccountManager';
import {mapAccountFromDB} from '../../database/entities/Mappers';
import AvikastError from '../../AvikastError';

@Injectable()
export default class AccountManager implements IAccountManager {
  constructor(private userStore: IUserStore) {}

  async getMyAccount(myUserId: string) {
    const dbUser = await this.userStore.getUser(myUserId);
    if (!dbUser) throw new AvikastError('User is not found');
    return mapAccountFromDB(dbUser);
  }

  async updateAccount(
    myUserId: string,
    user: {
      name: string;
      email: string;
    },
  ) {
    await this.userStore.updateUser(myUserId, user);
    const dbUser = await this.userStore.getUser(myUserId);
    if (!dbUser) throw new AvikastError('User is not found');
    return mapAccountFromDB(dbUser);
  }
}
