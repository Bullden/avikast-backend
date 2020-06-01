import {RoomType} from 'entities/Room';
import Room from 'database/entities/Room';
import {ParticipantRole} from 'entities/Participant';
import Participant from 'database/entities/Participant';

export default abstract class IRoomStore {
  abstract createRoom(room: {
    name: string;
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
  }): Promise<Room>;

  abstract findRoomByIdOrThrow(id: string): Promise<Room>;

  abstract findRoomByUser(userId: string): Promise<Room | null>;

  abstract createParticipant(participant: {
    user: {id: string};
    room: {id: string};
    role: ParticipantRole;
  }): Promise<Participant>;
}
