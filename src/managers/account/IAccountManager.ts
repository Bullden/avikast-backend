import Account from '../../entities/Account';
import {ID} from 'entities/Common';

export default abstract class IAccountManager {
  abstract getMyAccount(myUserId: string): Promise<Account>;

  abstract updateAccount(
    myUserId: ID,
    data: {
      name: string;
      email: string;
      country: string;
      city: string;
      dateOfBirth: Date;
      tags: string[];
      skills: string[];
    },
  ): Promise<Account>;
}
