import Account from '../../entities/Account';
import {ID} from 'entities/Common';
import User from 'entities/User';
import Ban from 'entities/Ban';

export default abstract class IAccountManager {
  abstract getMyAccount(myUserId: string): Promise<Account>;

  abstract updateAccount(
    myUserId: ID,
    data: {
      name: string | undefined;
      email: string | undefined;
      country: string | undefined;
      city: string | undefined;
      dateOfBirth: Date | undefined;
      tags: string[] | undefined;
      skills: string[] | undefined;
      referralCode: string | undefined;
      ban: Ban | undefined;
    },
  ): Promise<Account>;

  abstract getUsers(): Promise<User[]>;

  abstract deleteUsers(userIds: string[]): Promise<void>;

  abstract banUsersTemporary(userIds: string[], untilDate: string): Promise<void>;
}
