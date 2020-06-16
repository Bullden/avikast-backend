/* eslint-disable */
import IRoomStore from 'database/stores/room/IRoomStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import RoomModel, {CreateRoomModel, RoomSchema} from 'database/models/RoomModel';
import {RoomType} from 'entities/Room';
import {
  mapParticipantFromModel,
  mapParticipantsFromModel,
  mapRoomFromModel,
} from 'database/models/Mappers';
import ParticipantModel, {
  CreateParticipantModel,
  ParticipantSchema,
} from 'database/models/ParticipantModel';
import Participant, {ParticipantMedia, ParticipantRole} from 'entities/Participant';
import {RenewParticipantMedia} from 'entities/Mediasoup';
import * as mongoose from "mongoose";
import ParticipantTrackOptions from "graphql/entities/room/ParticipantTrackOptions";
import {log} from "util";

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
    media: ParticipantMedia;
  }) {
    const createParticipant: CreateParticipantModel = {
      room: participant.room.id,
      user: participant.user.id,
      role: participant.role,
      media: participant.media,
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

  async getParticipants(roomId: string) {
    return mapParticipantsFromModel(
      await this.participantModel.find({room: roomId}).populate(this.populateParticipant),
    );
  }

  async turnOnOffAudio(roomId: string, userId: string, request: RenewParticipantMedia) { //todo client id for sound
    const participant = await this.findParticipant(roomId, userId);
    if (!participant || !participant.media)
      throw new Error('participant or participant.media doesnt exist');
    const {video, screen} = participant.media;
    const updateObject: Partial<ParticipantModel> = {};
    console.log('enable audio', roomId, participant);
    updateObject.media = {audio: request, video, screen};
    await this.participantModel.update({room: roomId, user: userId}, updateObject);
    return true;
  }

  async turnOnOffVideo(roomId: string, userId: string, request: RenewParticipantMedia) {
    const participant = await this.findParticipant(roomId, userId);
    if (!participant || !participant.media)
      throw new Error('participant or participant.media doesnt exist');
    const {audio, screen} = participant.media;
    const updateObject: Partial<ParticipantModel> = {};
    console.log('enableVideo in store', roomId, request);
    updateObject.media = {audio, video: request, screen};
    await this.participantModel.update({room: roomId, user: userId}, updateObject);
    return true;
  }

  async turnOnOffScreen(roomId: string, userId: string, request: RenewParticipantMedia) {
    console.log(roomId, "roomId", userId, 'userID')
    const participant = await this.findParticipant(roomId, userId);
    if (!participant || !participant.media)
      throw new Error('participant or participant.media doesnt exist');
    const {audio, video} = participant.media;
    const updateObject: Partial<ParticipantModel> = {};
    updateObject.media = {audio, video, screen: request};
    await this.participantModel.update({room: roomId, user: userId}, updateObject);
    return true;
  }
}
