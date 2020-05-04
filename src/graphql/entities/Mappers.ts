import User from '../../entities/User';
import GQLUser from './user/User';
import AdditionalUserInfo from '../../entities/AdditionalUserInfo';
import GQLAdditionalUserInfo from './user/AdditionalUserInfo';
import Account from '../../entities/Account';
import GQLAccount from './account/Account';
import Preferences from 'entities/Preferences';
import Client from '../../entities/Client';
import GQLClient from 'graphql/entities/user/Client';
import ErrorHandler from '../../ErrorHandler';

export const mapAdditionalUserInfoToGQL = (
  additionalInfo: AdditionalUserInfo,
): GQLAdditionalUserInfo => ({
  email: additionalInfo.email,
});

export const mapUserToGQL = (
  user: User,
  addAdditionalInfo: boolean = false,
): GQLUser => {
  const additionalInfo = user.additionalUserInfo;
  if (addAdditionalInfo && !additionalInfo)
    throw new ErrorHandler('Additional info should be provided');
  return {
    id: user.id,
    name: user.name,
    birthday: user.birthday,
    additionalUserInfo:
      user.additionalUserInfo && addAdditionalInfo
        ? mapAdditionalUserInfoToGQL(user.additionalUserInfo)
        : undefined,
  };
};

export const mapPreferencesToGQL = (preferences: Preferences) => ({
  allowNotifications: preferences.allowNotifications,
});

export const mapAccountToGQL = (account: Account): GQLAccount => ({
  user: mapUserToGQL(account.user),
  info: mapAdditionalUserInfoToGQL(account.info),
  preferences: mapPreferencesToGQL(account.preferences),
});

export const mapClientToGQL = (client: Client): GQLClient => ({
  id: client.id,
  user: mapUserToGQL(client.user, true),
});

export const mapClientsToGQL = (clients: Client[]): GQLClient[] =>
  clients.map(mapClientToGQL);
