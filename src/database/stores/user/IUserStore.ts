import User from '../../entities/User';
import {ID} from 'entities/Common';

export default abstract class IUserStore {
  abstract createUser(data: {
    name: string;
    email: string;
    country: string;
    city: string;
    dateOfBirth: Date;
    avatarUrl: string;
    tags: string[];
    skills: string[];
    referralCode: string;
    referrer: string | undefined;
  }): Promise<User>;

  abstract updateUser(
    userId: ID,
    data: {
      name: string | undefined;
      country: string | undefined;
      city: string | undefined;
      dateOfBirth: Date | undefined;
      tags: string[] | undefined;
      skills: string[] | undefined;
      referralCode: string | undefined;
    },
  ): Promise<void>;

  abstract updateUserImage(myUserId: string, fileId: string): Promise<boolean>;

  abstract getUser(userId: ID): Promise<User | undefined>;

  abstract getUsers(): Promise<User[]>;

  abstract deleteUsers(userIds: string[]): Promise<void>;

  abstract banUsersTemporary(userIds: string[], untilDate: string): Promise<void>;

  abstract banUsersPermanently(userIds: string[]): Promise<void>;

  abstract restoreUsers(userIds: string[]): Promise<void>;

  abstract findUserByReferralCode(referralCode: string): Promise<User | undefined>;

  abstract getUserName(userId: ID): Promise<string>;

  abstract findUserByIdOrThrow(userId: string): Promise<User>;

  abstract getReferrersByUserId(id: ID): Promise<User[]>;
}
