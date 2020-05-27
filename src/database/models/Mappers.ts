/* eslint-disable no-underscore-dangle */
import User from '../entities/User';
import UserModel from './UserModel';
import LocalLoginModel, {CreateLocalLoginModel} from './LocalLoginModel';
import LocalLogin from '../entities/LocalLogin';
import SessionModel, {CreateSessionModel} from './SessionModel';
import Session from '../entities/Session';
import AppType from '../../entities/AppType';
import {Platform} from 'entities/Platform';
import RoomModel from 'database/models/RoomModel';
import Room from 'database/entities/Room';
import {Document} from 'mongoose';

const extractIdFromModel = (model: Document): string => model._id.toString();

export const mapUserToModel = (user: Partial<User>): Partial<UserModel> => ({
  name: user.name,
  email: user.email,
  country: user.country,
  city: user.city,
  dateOfBirth: user.dateOfBirth,
  avatarUrl: user.avatarUrl,
  tags: user.tags,
  skills: user.skills,
  allowNotifications: user.allowNotifications,
  referralCode: user.referralCode,
});

export const mapUserFromModel = (user: UserModel): User => {
  if (user.referrer && typeof user.referrer !== 'object')
    throw new Error('referrer should be an object');
  return {
    id: extractIdFromModel(user),
    name: user.name,
    email: user.email,
    country: user.country,
    city: user.city,
    dateOfBirth: user.dateOfBirth,
    avatarUrl: user.avatarUrl,
    tags: user.tags,
    skills: user.skills,
    allowNotifications: user.allowNotifications,
    referralCode: user.referralCode,
    referrer: user.referrer ? mapUserFromModel(user.referrer as UserModel) : undefined,
  };
};

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

export const mapRoomFromModel = (room: RoomModel): Room => {
  if (typeof room.user !== 'object') throw new Error('User should be object');
  return {
    id: extractIdFromModel(room),
    name: room.name,
    type: room.type,
    user: mapUserFromModel(room.user),
  };
};
