import Room, {MuteAction, MuteSource, RoomType} from 'entities/Room';
import Participant, {ParticipantMedia} from 'entities/Participant';
import {Observable} from 'rxjs';

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

  abstract getRoom(userId: string): Promise<string | undefined>;

  abstract getRoomByUserId(userId: string): Promise<Room | undefined>;

  abstract getRoomById(userId: string, roomId: string): Promise<Room>;

  abstract getRooms(): Promise<Room[]>;

  abstract deleteRooms(roomIds: string[]): Promise<void>;

  abstract getParticipants(userId: string, roomId: string): Promise<Participant[]>;

  abstract getWebinarOwner(userId: string, roomId: string): Promise<Participant>;

  abstract getParticipantsTracks(
    userId: string,
    roomId: string,
  ): Promise<ParticipantMedia[]>;

  abstract getInviteLink(roomId: string): Promise<string>;

  abstract raiseHand(
    roomId: string,
    userId: string,
    raiseHand: boolean,
  ): Promise<boolean>;

  abstract leaveRoom(roomId: string, userId: string): Promise<boolean>;

  abstract closeRoom(roomId: string): Promise<boolean>;

  abstract participantsTracksObservable(): Observable<ParticipantMedia[]>;

  abstract mute(
    action: MuteAction,
    source: MuteSource,
    userId: string,
    owner: string,
    roomId: string,
    producerId: string,
  ): Promise<boolean>;
}
