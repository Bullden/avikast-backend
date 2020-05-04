import User from '../../entities/User';
import DbUser from './User';
import Account from '../../entities/Account';
import AdditionalUserInfo from '../../entities/AdditionalUserInfo';
import Preferences from '../../entities/Preferences';
import Client from 'entities/Client';
import DbClient from './Client';
import DbAdmin from './Admin';
import Admin from '../../entities/Admin';
import ErrorHandler from '../../ErrorHandler';

export const mapAdditionalUserInfoFromDb = (
  user: DbUser,
): AdditionalUserInfo => ({
  email: user.email,
});

export const mapUserFromDb = (
  user: DbUser,
  addAdditionalInfo: boolean = false,
): User => ({
  id: user.id,
  name: user.name,
  birthday: user.birthday,
  additionalUserInfo: addAdditionalInfo
    ? mapAdditionalUserInfoFromDb(user)
    : undefined,
});

export const mapPreferencesFromDB = (user: DbUser): Preferences => ({
  allowNotifications: user.allowNotifications,
});

export const mapAccountFromDB = (account: DbUser): Account => ({
  user: mapUserFromDb(account),
  info: mapAdditionalUserInfoFromDb(account),
  preferences: mapPreferencesFromDB(account),
});

export const mapClientFromDb = (client: DbClient): Client => {
  if (!client.user) throw new ErrorHandler('Client user data not exist');

  return {
    id: client.id,
    user: mapUserFromDb(client.user, true),
  };
};

export const mapClientsFromDb = (clients: DbClient[]): Client[] =>
  clients.map(mapClientFromDb);

export const mapAdminFromDb = (admin: DbAdmin): Admin => {
  if (!admin.user) throw new ErrorHandler('Admin user data not exist');

  return {
    id: admin.id,
    user: mapUserFromDb(admin.user),
  };
};

export const mapAdminsFromDb = (admins: DbAdmin[]): Admin[] =>
  admins.map(mapAdminFromDb);
