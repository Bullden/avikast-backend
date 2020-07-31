import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';
import {
  ParticipantMedia,
  ParticipantRole,
  ParticipantTrackOptions,
} from 'entities/Participant';
import RoomModel, {RoomSchema, WebinarOptions} from './RoomModel';

export const ParticipantSchema = createSchema('participant', {
  user: {type: String, ref: UserSchema.name, required: true},
  room: {type: String, ref: RoomSchema.name, required: true},
  role: {type: ParticipantRole, enum: ParticipantRole, required: true},
  media: {type: Object, required: true},
  raiseHand: {type: Boolean},
  kicked: {type: Boolean},
  muted: {type: Boolean},
});

export default interface ParticipantModel extends Document {
  user: UserModel | string;
  room: RoomModel | string;
  role: ParticipantRole;
  webinarOptions?: WebinarOptions | undefined;
  media: {
    userName: string;
    audio: ParticipantTrackOptions;
    video: ParticipantTrackOptions;
    screen: ParticipantTrackOptions;
  };
  raiseHand?: boolean;
  kicked: boolean;
  muted: boolean;
}

export interface CreateParticipantModel {
  user: string;
  room: string;
  role: ParticipantRole;
  media: ParticipantMedia;
  raiseHand: boolean;
  kicked: boolean;
  muted: boolean;
}
