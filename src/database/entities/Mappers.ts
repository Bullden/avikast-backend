import User from '../../entities/User';
import DbUser from './User';
import Account from '../../entities/Account';
import AdditionalUserInfo from '../../entities/AdditionalUserInfo';
import Preferences from '../../entities/Preferences';

export const mapAdditionalUserInfoFromDb = (user: DbUser): AdditionalUserInfo => ({
  email: user.email,
});

export const mapUserFromDb = (
  user: DbUser,
  addAdditionalInfo: boolean = false,
): User => ({
  id: user.id,
  name: user.name,
  additionalUserInfo: addAdditionalInfo ? mapAdditionalUserInfoFromDb(user) : undefined,
});

export const mapPreferencesFromDB = (user: DbUser): Preferences => ({
  allowNotifications: user.allowNotifications,
});

export const mapAccountFromDB = (account: DbUser): Account => ({
  user: mapUserFromDb(account),
  info: mapAdditionalUserInfoFromDb(account),
  preferences: mapPreferencesFromDB(account),
});
