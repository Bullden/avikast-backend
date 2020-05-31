import IRoomStore from 'database/stores/room/IRoomStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import RoomModel, {CreateRoomModel, RoomSchema} from 'database/models/RoomModel';
import {RoomType} from 'entities/Room';
import {mapRoomFromModel} from 'database/models/Mappers';

export default class RoomStore extends IRoomStore {
  constructor(@InjectModel(RoomSchema.name) private roomModel: Model<RoomModel>) {
    super();
  }

  async createRoom(room: {
    name: string;
    type: RoomType;
    user: {id: string};
    passwordProtected: boolean;
    password: string | undefined;
  }) {
    const newRoom: CreateRoomModel = {
      name: room.name,
      type: room.type,
      user: room.user.id,
      passwordProtected: room.passwordProtected,
      password: room.password,
    };
    const createdRoom = await this.roomModel.create(newRoom);
    return this.findRoomByIdOrThrow(createdRoom.id);
  }

  async findRoomByIdOrThrow(id: string) {
    const room = await this.roomModel.findById(id).populate('user');
    if (!room) throw new Error('Room not found');
    return mapRoomFromModel(room);
  }

  async findRoomByUser(userId: string) {
    const room = await this.roomModel.findOne({user: userId}).populate('user');
    return room ? mapRoomFromModel(room) : null;
  }
}
