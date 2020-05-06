import User from '../entities/User';
import UserModel from './UserModel';
import LocalLoginModel from './LocalLoginModel';
import LocalLogin from '../entities/LocalLogin';
import SessionModel from './SessionModel';
import AppType from '../../entities/AppType';
import {Platform} from '../../entities/Platform';
import Session from '../entities/Session';

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
  localLogin: Partial<LocalLogin>,
): Partial<LocalLoginModel> => {
  if (!localLogin.user) throw new Error('localLogin.user must be provided');
  return {
    userId: localLogin.user.id,
    email: localLogin.email,
    passwordHash: localLogin.passwordHash,
  };
};

export const mapLocalLoginFromModel = (
  localLogin: LocalLoginModel,
  user: User,
): LocalLogin => ({
  id: localLogin.id,
  user,
  email: localLogin.email,
  passwordHash: localLogin.passwordHash,
});

export const mapAppType = (appType: AppType): string => ({
  appType,
});

export const mapSessionToModel = (session: Session): Partial<SessionModel> => ({
  userId: session.userId,
  token: session.token,
  refreshToken: session.refreshToken,
  appType: mapAppType(session.appType),
  platform: session.platform,
});

export const mapSessionFromModel = (session: SessionModel): Session => ({
  userId: session.userId,
  token: session.token,
  refreshToken: session.refreshToken,
  appType: session.appType,
  platform: session.platform,
});
