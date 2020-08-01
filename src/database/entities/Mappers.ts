import User from '../../entities/User';
import DbUser from './User';
import Account from '../../entities/Account';
import Preferences from '../../entities/Preferences';
import Room from 'entities/Room';
import DbRoom from './Room';
import BookmarkDB from './Bookmark';
import Bookmark from 'entities/Bookmark';
import ParticipantDB from './Participant';
import Participant, {ParticipantMedia} from 'entities/Participant';
import AvikastFileDB from './AvikastFile';
import MessageDB from './Message';
import {AvikastFile} from 'entities/AvikastFile';
import Message from 'entities/Message';
import RecordDB from './Record';
import Record from 'entities/Record';

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
  banUntilDate: user.banUntilDate,
  banForever: user.banForever,
});

export const mapUsersFromDB = (users: DbUser[]): User[] => users.map(mapUserFromDb);

export const mapPreferencesFromDB = (user: DbUser): Preferences => ({
  allowNotifications: user.allowNotifications,
});

export const mapAccountFromDB = (account: DbUser): Account => ({
  user: mapUserFromDb(account),
  preferences: mapPreferencesFromDB(account),
});

export const mapMessageFromDB = (message: MessageDB): Message => ({
  id: message.id,
  sender: mapUserFromDb(message.sender),
  roomId: message.roomId,
  body: message.body,
  date: message.date,
  receiverId: message.receiverId,
});

export const mapMessagesFromDB = (messages: MessageDB[]): Message[] =>
  messages.map(mapMessageFromDB);

export const mapRoomFromDB = (room: DbRoom): Room => ({
  id: room.id,
  closed: room.closed,
  name: room.name,
  inviteLink: room.inviteLink,
  type: room.type,
  user: mapUserFromDb(room.user),
});

export const mapRoomsFromDB = (rooms: DbRoom[]): Room[] => rooms.map(mapRoomFromDB);

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
  media: participant.media,
  webinarOptions: participant.webinarOptions,
  raiseHand: participant.raiseHand ?? undefined,
});

export const mapParticipantTrackFromDB = (
  participantMedia: ParticipantMedia,
): ParticipantMedia => ({
  userName: participantMedia.userName,
  audio: participantMedia.audio,
  video: participantMedia.video,
  screen: participantMedia.screen,
});

export const mapParticipantsTracksFromDB = (
  participantMedia: ParticipantMedia[],
): ParticipantMedia[] => participantMedia.map(mapParticipantTrackFromDB);

export const mapParticipantsFromDB = (participants: ParticipantDB[]): Participant[] =>
  participants.map(mapParticipantFromDB);

export const mapAvikastFileFromDB = (avikastFile: AvikastFileDB): AvikastFile => ({
  id: avikastFile.id,
  name: avikastFile.name,
  type: avikastFile.type,
  user: mapUserFromDb(avikastFile.user),
  fileId: avikastFile.file ? avikastFile.file.id : undefined,
});

export const mapAvikastFilesFromDB = (avikastFiles: AvikastFileDB[]): AvikastFile[] =>
  avikastFiles.map(mapAvikastFileFromDB);

export const mapRecordFromDB = (record: RecordDB): Record => ({
  id: record.id,
  date: record.date,
  name: record.name,
  fileId: record.fileId,
  user: mapUserFromDb(record.user),
});

export const mapRecordsFromDb = (records: RecordDB[]): Record[] =>
  records.map(mapRecordFromDB);
