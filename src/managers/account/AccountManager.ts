import {Injectable} from '@nestjs/common';
import IUserStore from '../../database/stores/user/IUserStore';
import IAccountManager from './IAccountManager';
import {mapAccountFromDB, mapUsersFromDB} from 'database/entities/Mappers';
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
      name: string | undefined;
      country: string | undefined;
      city: string | undefined;
      dateOfBirth: Date | undefined;
      tags: string[] | undefined;
      skills: string[] | undefined;
      referralCode: string | undefined;
    },
  ) {
    await this.userStore.updateUser(myUserId, user);
    const dbUser = await this.userStore.getUser(myUserId);
    if (!dbUser) throw new AvikastError('User is not found');
    return mapAccountFromDB(dbUser);
  }

  async updateUserImage(myUserId: string, fileId: string) {
    return this.userStore.updateUserImage(myUserId, fileId);
  }

  async getUsers() {
    const users = await this.userStore.getUsers();

    return mapUsersFromDB(users);
  }

  async deleteUsers(userIds: string[]) {
    await this.userStore.deleteUsers(userIds);
  }

  async banUsersTemporary(userIds: string[], untilDate: string) {
    await this.userStore.banUsersTemporary(userIds, untilDate);
  }

  async banUsersPermanently(userIds: string[]) {
    await this.userStore.banUsersPermanently(userIds);
  }

  async restoreUsers(userIds: string[]) {
    await this.userStore.restoreUsers(userIds);
  }
}
