import Room from 'database/entities/Room';
import {
  ParticipantMedia,
  ParticipantRole,
  ParticipantTrackOptions,
} from 'entities/Participant';
import Participant from 'database/entities/Participant';
import {RoomType} from 'entities/Room';

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
  }): Promise<Participant>;

  abstract findParticipant(
    roomId: string,
    userId: string,
  ): Promise<Participant | undefined>;

  abstract getParticipants(roomId: string): Promise<Participant[]>;

  abstract getWebinarOwner(userId: string, roomId: string): Promise<Participant>;

  abstract updateParticipantMedia(
    type: 'audio' | 'video' | 'screenShare',
    roomId: string,
    clientId: string,
    renewParticipantMedia: ParticipantTrackOptions,
  ): Promise<boolean>;

  abstract getInviteLink(roomId: string): Promise<string>;

  abstract updateRaiseHand(
    roomId: string,
    userId: string,
    raiseHand: boolean,
  ): Promise<boolean>;

  abstract leaveRoom(roomId: string, userId: string): Promise<boolean>;

  abstract closeRoom(roomId: string): Promise<boolean>;
}
