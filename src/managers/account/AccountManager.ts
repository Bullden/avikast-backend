import { Injectable } from '@nestjs/common';
import IUserStore from '../../database/stores/user/IUserStore';
import IAccountManager from './IAccountManager';
import { mapAccountFromDB } from '../../database/entities/Mappers';
import ErrorHandler from '../../ErrorHandler';

@Injectable()
export default class AccountManager implements IAccountManager {
  constructor(private userStore: IUserStore) {}

  async getMyAccount(myUserId: string) {
    const dbUser = await this.userStore.getUser(myUserId);
    if (!dbUser) throw new ErrorHandler('User is not found');
    return mapAccountFromDB(dbUser);
  }

  async updateAccount(
    myUserId: string,
    user: {
      name: string;
      birthday: Date;
      email: string;
      phoneNumber: string;
    },
  ) {
    await this.userStore.updateUser(myUserId, user);
    const dbUser = await this.userStore.getUser(myUserId);
    if (!dbUser) throw new ErrorHandler('User is not found');
    return mapAccountFromDB(dbUser);
  }

  async updateAccountPreferences(userId: string, allowNotifications: boolean) {
    await this.userStore.updatePreferences(userId, allowNotifications);
    const dbUser = await this.userStore.getUser(userId);
    if (!dbUser) throw new ErrorHandler('User is not found');
    return mapAccountFromDB(dbUser);
  }
}
