import Room, {RoomType, ViewModeEnum} from 'entities/Room';
import Participant, {ParticipantMedia} from 'entities/Participant';

export default abstract class IRoomManager {
  abstract createRoom(
    userId: string,
    name: string,
    type: RoomType,
    passwordProtected: boolean,
    password: string | undefined,
  ): Promise<Room>;

  abstract joinRoom(
    userId: string,
    inviteLink: string,
    password: string | undefined,
  ): Promise<Room>;

  abstract getRoomById(userId: string, roomId: string): Promise<Room>;

  abstract getParticipants(userId: string, roomId: string): Promise<Participant[]>;

  abstract getWebinarOwner(userId: string, roomId: string): Promise<Participant>;

  abstract setWebinarViewMode(
    userId: string,
    roomId: string,
    viewMode: ViewModeEnum,
  ): Promise<void>;

  abstract getParticipantsTracks(
    userId: string,
    roomId: string,
  ): Promise<ParticipantMedia[]>;

  abstract getInviteLink(roomId: string): Promise<string>;
}
