import User from '../entities/User';
import UserModel from './UserModel';
import LocalLoginModel, {CreateLocalLoginModel} from './LocalLoginModel';
import LocalLogin from '../entities/LocalLogin';
import SessionModel, {CreateSessionModel} from './SessionModel';
import Session from '../entities/Session';
import AppType from '../../entities/AppType';
import {Platform} from '../../entities/Platform';

export const mapUserToModel = (user: Partial<User>): Partial<UserModel> => ({
  name: user.name,
  email: user.email,
  allowNotifications: user.allowNotifications,
});

export const mapUserFromModel = (user: UserModel): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  allowNotifications: user.allowNotifications,
});

export const mapLocalLoginToModel = (
  user: User,
  email: string,
  passwordHash: string,
): Partial<CreateLocalLoginModel> => {
  return {
    user: user.id,
    email,
    passwordHash,
  };
};

export const mapLocalLoginFromModel = (
  localLogin: LocalLoginModel,
  overrideUser?: User,
): LocalLogin => {
  let user = overrideUser;
  if (!user) {
    if (!localLogin.user) throw new Error('User should be provided');
    user = mapUserFromModel(localLogin.user as UserModel);
  }
  return {
    id: localLogin.id,
    user,
    email: localLogin.email,
    passwordHash: localLogin.passwordHash,
  };
};

export const mapSessionToModel = (
  userId: string,
  token: string,
  refreshToken: string,
  appType: AppType,
  platform: Platform,
): Partial<CreateSessionModel> => ({
  user: userId,
  token,
  refreshToken,
  appType,
  platform,
});

export const mapSessionFromModel = (
  session: SessionModel,
  overrideUser?: User,
): Session => {
  let user = overrideUser;
  if (!user) {
    if (!session.user) throw new Error('User should be provided');
    user = mapUserFromModel(session.user);
  }
  return {
    id: session.id,
    user,
    userId: user.id,
    token: session.token,
    refreshToken: session.refreshToken,
    appType: session.appType,
    platform: session.platform,
  };
};
