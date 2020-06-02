import IRoomStore from 'database/stores/room/IRoomStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import RoomModel, {CreateRoomModel, RoomSchema} from 'database/models/RoomModel';
import {RoomType} from 'entities/Room';
import {mapParticipantFromModel, mapRoomFromModel} from 'database/models/Mappers';
import ParticipantModel, {
  CreateParticipantModel,
  ParticipantSchema,
} from 'database/models/ParticipantModel';
import {ParticipantRole} from 'entities/Participant';

export default class RoomStore extends IRoomStore {
  constructor(
    @InjectModel(RoomSchema.name)
    private roomModel: Model<RoomModel>,
    @InjectModel(ParticipantSchema.name)
    private participantModel: Model<ParticipantModel>,
  ) {
    super();
  }

  private readonly populateRoom: QueryPopulateOptions = {
    path: 'user',
  };

  private readonly populateParticipant: QueryPopulateOptions[] = [
    {
      path: 'user',
    },
    {
      path: 'room',
      populate: this.populateRoom,
    },
  ];

  async createRoom(room: {
    name: string;
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
    code: string;
  }) {
    const newRoom: CreateRoomModel = {
      name: room.name,
      type: room.type,
      user: room.user.id,
      passwordProtected: room.passwordProtected,
      password: room.password,
      code: room.code,
    };
    const createdRoom = await this.roomModel.create(newRoom);
    return mapRoomFromModel(await createdRoom.populate(this.populateRoom).execPopulate());
  }

  async findRoomByIdOrThrow(id: string) {
    const room = await this.roomModel.findById(id).populate(this.populateRoom);
    if (!room) throw new Error('Room not found');
    return mapRoomFromModel(room);
  }

  async findRoomByUser(userId: string) {
    const room = await this.roomModel.findOne({user: userId}).populate(this.populateRoom);
    return room ? mapRoomFromModel(room) : null;
  }

  async createParticipant(participant: {
    user: {id: string};
    room: {id: string};
    role: ParticipantRole;
  }) {
    const createParticipant: CreateParticipantModel = {
      room: participant.room.id,
      user: participant.user.id,
      role: participant.role,
    };
    const createdParticipant = await this.participantModel.create(createParticipant);
    return mapParticipantFromModel(
      await createdParticipant.populate(this.populateParticipant).execPopulate(),
    );
  }

  async findRoomByCode(code: string) {
    const room = await this.roomModel.findOne({code}).populate(this.populateRoom);
    return room ? mapRoomFromModel(room) : null;
  }

  async findParticipant(roomId: string, userId: string) {
    const room = await this.participantModel
      .findOne({room: roomId, user: userId})
      .populate(this.populateParticipant);
    return room ? mapParticipantFromModel(room) : undefined;
  }
}
