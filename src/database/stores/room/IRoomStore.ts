import Room from 'database/entities/Room';
import RoomEntity from '../../entities/Room';
import {
  ParticipantMedia,
  ParticipantRole,
  ParticipantTrackOptions,
} from 'entities/Participant';
import Participant from 'database/entities/Participant';
import {MuteAction, MuteSource, RoomType} from 'entities/Room';
import {Observable} from 'rxjs';
import {PlayingType} from 'entities/Mediasoup';

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

  abstract findRoomAsRoomOwnerByUserId(userId: string): Promise<Room | null>;

  abstract findRoomAsParticipantByUserId(userId: string): Promise<Room | null>;

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

  abstract getRooms(): Promise<Room[]>;

  abstract deleteRooms(roomIds: string[]): Promise<void>;

  abstract getWebinarOwner(userId: string, roomId: string): Promise<Participant>;

  abstract updateParticipantMedia(
    type: 'audio' | 'video' | 'screenShare',
    roomId: string,
    clientId: string,
    userId: string,
    renewParticipantMedia: ParticipantTrackOptions,
  ): Promise<boolean>;

  abstract updateEmptyParticipant(
    roomId: string,
    clientId: string,
    userId: string,
  ): Promise<void>;

  abstract getInviteLink(roomId: string): Promise<string>;

  abstract updateRaiseHand(
    roomId: string,
    userId: string,
    raiseHand: boolean,
  ): Promise<boolean>;

  abstract leaveRoom(roomId: string, userId: string): Promise<boolean>;

  abstract closeRoom(roomId: string): Promise<boolean>;

  abstract createRecordId(roomId: string, recordId: string): Promise<void>;

  // abstract watchParticipantCreated(): Observable<ParticipantMedia[]>;

  abstract watchRoom(): Observable<RoomEntity>;

  abstract mute(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    roomId: string,
  ): Promise<boolean>;

  abstract muteAll(action: MuteAction, userId: string, roomId: string): Promise<boolean>;

  abstract muteAudio(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    roomId: string,
  ): Promise<boolean>;

  abstract muteVideo(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    roomId: string,
  ): Promise<boolean>;

  abstract muteScreen(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    roomId: string,
  ): Promise<boolean>;

  abstract kick(
    roomOwnerUserId: string,
    userId: string,
    roomId: string,
  ): Promise<boolean>;

  abstract playPauseMedia(
    media: PlayingType,
    status: boolean,
    roomId: string,
    userId: string,
  ): Promise<void>;
}
