import Account from '../../entities/Account';
import { ID } from 'entities/Common';

export default abstract class IAccountManager {
  abstract getMyAccount(myUserId: string): Promise<Account>;

  abstract updateAccount(
    myUserId: ID,
    data: {
      name: string;
      birthday: Date;
      email: string;
    },
  ): Promise<Account>;
}
