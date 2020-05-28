import User from '../../entities/User';
import DbUser from './User';
import Account from '../../entities/Account';
import Preferences from '../../entities/Preferences';

export const mapUserFromDb = (user: DbUser): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  country: user.country,
  city: user.city,
  dateOfBirth: user.dateOfBirth,
  avatarUrl: user.avatarUrl,
  tags: user.tags,
  skills: user.skills,
  referralCode: user.referralCode,
  referrer: user.referrer ? mapUserFromDb(user.referrer) : undefined,
});

export const mapPreferencesFromDB = (user: DbUser): Preferences => ({
  allowNotifications: user.allowNotifications,
});

export const mapAccountFromDB = (account: DbUser): Account => ({
  user: mapUserFromDb(account),
  preferences: mapPreferencesFromDB(account),
});
