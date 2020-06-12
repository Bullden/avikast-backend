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
import BookmarkModel from './BookmarkModel';
import Bookmark from '../entities/Bookmark';
import ParticipantModel from 'database/models/ParticipantModel';
import Participant from 'database/entities/Participant';
import AvikastFileModel from './AvikastFileModel';
import AvikastFile from '../entities/AvikastFile';
import MessageModel from './MessageModel';
import Message from '../entities/Message';

export const extractIdFromModel = (model: Document): string => model._id.toString();

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

export const mapMessageFromModel = (message: MessageModel): Message => ({
  id: extractIdFromModel(message),
  senderId: message.senderId,
  roomId: message.roomId,
  body: message.body,
  date: message.date,
  receiverId: message.receiverId,
});

export const mapMessagesFromModel = (messages: MessageModel[]): Message[] =>
  messages.map(mapMessageFromModel);

export const mapRoomFromModel = (room: RoomModel): Room => {
  if (typeof room.user !== 'object') throw new Error('User should be object');
  return {
    id: extractIdFromModel(room),
    name: room.name,
    type: room.type,
    user: mapUserFromModel(room.user),
    passwordProtected: room.passwordProtected,
    password: room.password,
    code: room.code,
    // messages: room.messages ? mapMessagesFromModel(room.messages) : undefined,
  };
};

export const mapBookmarkFromModel = (bookmark: BookmarkModel): Bookmark => {
  if (typeof bookmark.user !== 'object') throw new Error('Bookmark should be object');
  return {
    id: extractIdFromModel(bookmark),
    date: bookmark.date,
    topic: bookmark.topic,
    text: bookmark.text,
    user: mapUserFromModel(bookmark.user),
  };
};

export const mapBookmarksFromModel = (bookmarks: BookmarkModel[]): Bookmark[] =>
  bookmarks.map(mapBookmarkFromModel);

export const mapParticipantFromModel = (participant: ParticipantModel): Participant => {
  if (typeof participant.user !== 'object') throw new Error('User should be object');
  if (typeof participant.room !== 'object') throw new Error('Room should be object');
  return {
    id: extractIdFromModel(participant),
    room: mapRoomFromModel(participant.room),
    user: mapUserFromModel(participant.user),
    role: participant.role,
  };
};

export const mapParticipantsFromModel = (
  participants: ParticipantModel[],
): Participant[] => participants.map(mapParticipantFromModel);

export const mapAvikastFileFromModel = (file: AvikastFileModel): AvikastFile => {
  if (typeof file.user !== 'object') throw new Error('File should be object');
  return {
    id: extractIdFromModel(file),
    name: file.name,
    type: file.type,
    user: mapUserFromModel(file.user),
  };
};

export const mapAvikastFilesFromModel = (files: AvikastFileModel[]): AvikastFile[] =>
  files.map(mapAvikastFileFromModel);
