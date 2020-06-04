import User from '../../entities/User';
import GQLUser from './user/User';
import Account from '../../entities/Account';
import GQLAccount from './account/Account';
import GQLPreferences from './user/Preferences';
import Preferences from 'entities/Preferences';
import Room from 'entities/Room';
import GQLRoom from './room/Room';
import Bookmark from '../../entities/Bookmark';
import GQLBookmark from './bookmark/Bookmark';
import GQLMediaAttributes from './mediasoup/MediaAttributesOptions';
import {Direction, MediaAttributes} from 'entities/Mediasoup';
import Participant from 'entities/Participant';
import GQLParticipant from './room/Participant';

export const mapUserToGQL = (user: User): GQLUser => {
  return {
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
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mapPreferencesToGQL = (preferences: Preferences): GQLPreferences => ({
  allowNotifications: false,
});

export const mapAccountToGQL = (account: Account): GQLAccount => ({
  user: mapUserToGQL(account.user),
  preferences: mapPreferencesToGQL(account.preferences),
});

export const mapRoomToGQL = (room: Room): GQLRoom => ({
  id: room.id,
  name: room.name,
  type: room.type,
});

export const mapBookmarkToGQL = (bookmark: Bookmark): GQLBookmark => ({
  id: bookmark.id,
  date: bookmark.date,
  topic: bookmark.topic,
  text: bookmark.text,
  user: mapUserToGQL(bookmark.user),
});

export const mapBookmarksToGQL = (bookmarks: Bookmark[]): GQLBookmark[] =>
  bookmarks.map(mapBookmarkToGQL);

export const mapMediaAttributes = (
  mediaAttributes: GQLMediaAttributes,
): MediaAttributes => ({
  direction: mediaAttributes.direction as 'send' | 'receive',
  kind: mediaAttributes.kind as 'video' | 'audio',
  mediaType: mediaAttributes.mediaType as 'camera' | 'screenshare',
});

export const mapParticipantToGQL = (participant: Participant): GQLParticipant => ({
  id: participant.id,
  user: mapUserToGQL(participant.user),
  role: participant.role,
});

export const mapParticipantsToGQL = (participants: Participant[]): GQLParticipant[] =>
  participants.map(mapParticipantToGQL);
