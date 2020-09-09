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
import BookmarkModel from './BookmarkModel';
import Bookmark from '../entities/Bookmark';
import ParticipantModel from 'database/models/ParticipantModel';
import Participant from 'database/entities/Participant';
import AvikastFileModel from './AvikastFileModel';
import AvikastFile from '../entities/AvikastFile';
import MessageModel from './MessageModel';
import Message from '../entities/Message';
import FileModel from 'database/models/FileModel';
import File from 'database/entities/File';
import RecordModel from 'database/models/RecordModel';
import Record from 'database/entities/Record';
import {ObjectId} from 'bson';
import ResumeModel from 'database/models/ResumeModel';
import Resume from 'entities/Resume';

export const extractIdFromModel = (model: {_id: ObjectId}): string =>
  model._id.toString();

export const mapUserFromModel = (user: UserModel): User => {
  if (user.referrer && typeof user.referrer !== 'object')
    throw new Error('referrer should be an object');
  if (user.referrer) {
    const referrer = user.referrer as UserModel;
    referrer.referrer = undefined;
  }
  return {
    id: extractIdFromModel(user),
    name: user.name,
    email: user.email,
    country: user.country,
    city: user.city,
    position: user.position,
    telephone: user.telephone,
    dateOfBirth: user.dateOfBirth,
    avatarUrl: user.avatarUrl,
    tags: user.tags,
    skills: user.skills,
    mission: user.mission,
    vision: user.vision,
    interests: user.interests,
    allowNotifications: user.allowNotifications,
    referralCode: user.referralCode,
    referrer: user.referrer ? mapUserFromModel(user.referrer as UserModel) : undefined,
    banUntilDate: user.banUntilDate,
    banForever: user.banForever,
    logoUrl: user.logoUrl,
    backgroundUrl: user.backgroundUrl,
  };
};

export const mapUsersFromModel = (users: UserModel[]): User[] =>
  users.map(mapUserFromModel);

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
    if (!localLogin.user) throw new Error('Resume should be provided');
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
    if (!session.user) throw new Error('Resume should be provided');
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
  sender: mapUserFromModel(message.sender),
  roomId: message.roomId,
  body: message.body,
  date: message.date,
  receiverId: message.receiverId,
});

export const mapMessagesFromModel = (messages: MessageModel[]): Message[] =>
  messages.map(mapMessageFromModel);

export const mapRoomFromModel = (room: RoomModel): Room => {
  if (typeof room.user !== 'object') throw new Error('Resume should be object');
  return {
    id: extractIdFromModel(room),
    closed: room.closed,
    name: room.name,
    type: room.type,
    user: mapUserFromModel(room.user),
    passwordProtected: room.passwordProtected,
    password: room.password,
    inviteLink: room.inviteLink,
    recordingId: room.recordingId,
  };
};

export const mapRoomsFromModel = (rooms: RoomModel[]): Room[] =>
  rooms.map(mapRoomFromModel);

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
  if (typeof participant.user !== 'object') throw new Error('Resume should be object');
  if (typeof participant.room !== 'object') throw new Error('Room should be object');
  return {
    id: extractIdFromModel(participant),
    room: mapRoomFromModel(participant.room),
    user: mapUserFromModel(participant.user),
    role: participant.role,
    media: participant.media,
    webinarOptions: participant.webinarOptions,
    raiseHand: participant.raiseHand,
    kicked: participant.kicked,
    muted: participant.muted,
  };
};

// export const mapWebinarOwnerFromModel = (participant: ParticipantModel): Participant => {
//   if (typeof participant.user !== 'object') throw new Error('Resume should be object');
//   if (typeof participant.room !== 'object') throw new Error('Room should be object');
//   return {
//     id: extractIdFromModel(participant),
//     room: mapRoomFromModel(participant.room),
//     user: mapUserFromModel(participant.user),
//     role: participant.role,
//     media: participant.media,
//     webinarOptions: participant.webinarOptions,
//     raiseHand: participant.raiseHand,
//   };
// };

export const mapParticipantsFromModel = (
  participants: ParticipantModel[],
): Participant[] => participants.map(mapParticipantFromModel);

export const mapFileFromModel = (file: FileModel): File => ({
  id: extractIdFromModel(file),
  mediaLink: file.mediaLink,
  name: file.name,
  mimeType: file.mimeType,
});

export const mapAvikastFileFromModel = (file: AvikastFileModel): AvikastFile => {
  if (typeof file.user !== 'object') throw new Error('Resume should be object');
  let mappedFile: File | undefined;
  if (file.file) {
    if (typeof file.file !== 'object') throw new Error('File should be object');
    mappedFile = mapFileFromModel(file.file);
  }
  return {
    id: extractIdFromModel(file),
    name: file.name,
    type: file.type,
    user: mapUserFromModel(file.user),
    file: mappedFile,
  };
};

export const mapAvikastFilesFromModel = (files: AvikastFileModel[]): AvikastFile[] =>
  files.map(mapAvikastFileFromModel);

export const mapRecordFromModel = (record: RecordModel): Record => {
  if (typeof record.user !== 'object') throw new Error('Resume should be object');
  if (typeof record.file !== 'object') throw new Error('File should be object');
  return {
    id: extractIdFromModel(record),
    date: record.date,
    fileId: extractIdFromModel(record.file),
    name: record.name,
    user: mapUserFromModel(record.user),
  };
};

export const mapRecordsFromModel = (record: RecordModel[]): Record[] =>
  record.map(mapRecordFromModel);

export const mapResumeFromModel = (resume: ResumeModel): Resume => {
  // if (typeof record.user !== 'object') throw new Error('Resume should be object');
  return {
    summary: resume.summary,
    experience: resume.experience,
    education: resume.education,
    awards: resume.awards,
  };
};
