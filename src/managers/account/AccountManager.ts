import {Injectable} from '@nestjs/common';
import IUserStore from '../../database/stores/user/IUserStore';
import IAccountManager from './IAccountManager';
import {mapAccountFromDB, mapUserFromDb, mapUsersFromDB} from 'database/entities/Mappers';
import AvikastError from '../../AvikastError';
import IResumeStore from 'database/stores/resume/IResumeStore';
import User from 'entities/User';
import {IPdfService} from '../../services/pdf/IPdfService';

@Injectable()
export default class AccountManager implements IAccountManager {
  constructor(
    private userStore: IUserStore,
    private resumeStore: IResumeStore,
    private pdfService: IPdfService,
  ) {}

  async getMyAccount(myUserId: string) {
    const dbUser = await this.userStore.getUser(myUserId);
    if (!dbUser) throw new AvikastError('Resume is not found');
    return mapAccountFromDB(dbUser);
  }

  async updateAccount(
    myUserId: string,
    user: {
      name: string | undefined;
      country: string | undefined;
      city: string | undefined;
      position: string | undefined;
      telephone: string | undefined;
      dateOfBirth: Date | undefined;
      tags: string[] | undefined;
      skills: string[] | undefined;
      mission: string[] | undefined;
      vision: string[] | undefined;
      interests: string[] | undefined;
      referralCode: string | undefined;
    },
  ) {
    await this.userStore.updateUser(myUserId, user);
    const dbUser = await this.userStore.getUser(myUserId);
    if (!dbUser) throw new AvikastError('Resume is not found');
    return mapAccountFromDB(dbUser);
  }

  async updateUserImage(myUserId: string, fileId: string) {
    return this.userStore.updateUserImage(myUserId, fileId);
  }

  async updateUserLogoImage(myUserId: string, fileId: string) {
    return this.userStore.updateUserLogoImage(myUserId, fileId);
  }

  async updateUserBackgroundImage(myUserId: string, fileId: string) {
    return this.userStore.updateUserBackgroundImage(myUserId, fileId);
  }

  async updateUserResumeUrl(myUserId: string, fileId: string) {
    return this.userStore.updateUserResumeUrl(myUserId, fileId);
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

  async referrersByUserId(userId: string): Promise<User[]> {
    const user = await this.userStore.getUser(userId);
    if (!user) throw new AvikastError('User is not found');
    const userRefs: User[] = [];
    const getReferrers = async (user: User, userArr: User[] = []) => {
      const referrers = await this.userStore.getReferrersByUserId(user.id);
      referrers.forEach((ref) => {
        userArr.push(ref);
        if (ref.referrer?.referrer) {
          return getReferrers(ref.referrer, userArr);
        }
      });
      return userArr;
    };

    await getReferrers(user, userRefs);

    return mapUsersFromDB(userRefs);
  }

  async getUserById(userId: string) {
    const user = await this.userStore.getUser(userId);
    if (!user) {
      throw new Error(`User with id: ${userId} does not exist`);
    }
    return mapUserFromDb(user);
  }

  async uploadResume(myUserId: string, fileId: string) {
    return this.userStore.updateUserResumeUrl(myUserId, fileId);
  }
}
