import {RoomType} from 'entities/Room';
import Room from 'database/entities/Room';
import {
  ParticipantMedia,
  ParticipantRole,
  ParticipantTrackOptions,
} from 'entities/Participant';
import Participant from 'database/entities/Participant';

export default abstract class IRoomStore {
  abstract createRoom(room: {
    name: string;
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
    code: string;
  }): Promise<Room>;

  abstract findRoomByIdOrThrow(id: string): Promise<Room>;

  abstract findRoomByUser(userId: string): Promise<Room | null>;

  abstract findRoomByCode(code: string): Promise<Room | null>;

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

  abstract updateParticipantMedia(
    type: 'audio' | 'video' | 'screenShare',
    roomId: string,
    clientId: string,
    renewParticipantMedia: ParticipantTrackOptions,
  ): Promise<boolean>;
}
