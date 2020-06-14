import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';
import {ParticipantMedia, ParticipantRole} from 'entities/Participant';
import RoomModel, {RoomSchema} from './RoomModel';

export const ParticipantSchema = createSchema('participant', {
  user: {type: String, ref: UserSchema.name, required: true},
  room: {type: String, ref: RoomSchema.name, required: true},
  role: {type: ParticipantRole, enum: ParticipantRole, required: true},
  media: {type: Object, required: true},
});

export default interface ParticipantModel extends Document {
  user: UserModel | string;
  room: RoomModel | string;
  role: ParticipantRole;
  media: ParticipantMedia;
}

export interface CreateParticipantModel {
  user: string;
  room: string;
  role: ParticipantRole;
  media: ParticipantMedia;
}
