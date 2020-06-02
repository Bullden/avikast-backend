import User from '../../entities/User';
import DbUser from './User';
import Account from '../../entities/Account';
import Preferences from '../../entities/Preferences';
import Room from 'entities/Room';
import DbRoom from './Room';
import BookmarkDB from './Bookmark';
import Bookmark from 'entities/Bookmark';
import ParticipantDB from './Participant';
import Participant from 'entities/Participant';

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

export const mapRoomFromDB = (room: DbRoom): Room => ({
  id: room.id,
  name: room.name,
  type: room.type,
});

export const mapBookmarkFromDB = (bookmark: BookmarkDB): Bookmark => ({
  id: bookmark.id,
  date: bookmark.date,
  topic: bookmark.topic,
  text: bookmark.text,
  user: mapUserFromDb(bookmark.user),
});

export const mapBookmarksFromDB = (bookmarks: BookmarkDB[]): Bookmark[] =>
  bookmarks.map(mapBookmarkFromDB);

export const mapParticipantFromDB = (participant: ParticipantDB): Participant => ({
  id: participant.id,
  user: mapUserFromDb(participant.user),
  role: participant.role,
});

export const mapParticipantsFromDB = (participants: ParticipantDB[]): Participant[] =>
  participants.map(mapParticipantFromDB);
