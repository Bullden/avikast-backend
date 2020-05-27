import IRoomManager from './IRoomManager';
import IMediasoupService from '../../services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import Room from '../../entities/Room';

@Injectable()
export default class RoomManager extends IRoomManager {
  public rooms: Map<string, Room> = new Map();

  constructor(private readonly mediasoupService: IMediasoupService) {
    super();
  }

  async createRoom(name: string) {
    this.rooms.set(name, {name});
    await this.mediasoupService.createRouter();
  }
}
