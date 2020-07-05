import Room from 'database/entities/Room';
import {
  ParticipantMedia,
  ParticipantRole,
  ParticipantTrackOptions,
} from 'entities/Participant';
import Participant from 'database/entities/Participant';
import {RoomType, ViewModeEnum, WebinarOptions} from 'entities/Room';

export default abstract class IRoomStore {
  abstract createRoom(room: {
    name: string;
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
    inviteLink: string;
  }): Promise<Room>;

  abstract findRoomByIdOrThrow(id: string): Promise<Room>;

  abstract findRoomByUser(userId: string): Promise<Room | null>;

  abstract findRoomByCode(inviteLink: string): Promise<Room | null>;

  abstract createParticipant(participant: {
    user: {id: string};
    room: {id: string};
    role: ParticipantRole;
    media: ParticipantMedia;
    webinarOptions?: WebinarOptions;
  }): Promise<Participant>;

  abstract findParticipant(
    roomId: string,
    userId: string,
  ): Promise<Participant | undefined>;

  abstract getParticipants(roomId: string): Promise<Participant[]>;

  abstract getWebinarOwner(userId: string, roomId: string): Promise<Participant>;

  abstract setWebinarViewMode(
    userId: string,
    roomId: string,
    viewMode: ViewModeEnum,
  ): Promise<void>;

  abstract updateParticipantMedia(
    type: 'audio' | 'video' | 'screenShare',
    roomId: string,
    clientId: string,
    renewParticipantMedia: ParticipantTrackOptions,
  ): Promise<boolean>;

  abstract getInviteLink(roomId: string): Promise<string>;
}
