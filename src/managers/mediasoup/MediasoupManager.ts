import IMediasoupManager from './IMediasoupManager';
import IMediasoupService from 'services/mediasoup/IMediasoupService';
import {Injectable} from '@nestjs/common';
import {Direction, MediaKind, MediaType} from 'entities/Mediasoup';
import IRoomStore from 'database/stores/room/IRoomStore';
import {ParticipantTrackOptions} from 'entities/Participant';
import IFileStore from 'database/stores/file/IFileStore';
import {v4 as uuidv4} from 'uuid';
import {getNameAsDate} from '../../services/mediasoup/Utils';
import IRecordStore from 'database/stores/record/IRecordStore';

@Injectable()
export default class MediasoupManager extends IMediasoupManager {
  constructor(
    private readonly mediasoupService: IMediasoupService,
    private readonly roomStore: IRoomStore,
    private readonly fileStore: IFileStore,
    private readonly recordStore: IRecordStore,
  ) {
    super();
  }

  async createTransport(
    roomId: string,
    userId: string,
    direction: Direction,
    clientId: string,
  ) {
    if (direction === 'send') {
      await this.roomStore.updateEmptyParticipant(roomId, clientId, userId);
    }
    return this.mediasoupService.createTransport(roomId, userId, direction, clientId);
  }

  async connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: Direction,
    clientId: string,
  ) {
    await this.mediasoupService.connectTransport(
      roomId,
      dtlsParameters,
      direction,
      clientId,
    );
  }

  async createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    userId: string,
    rtpParameters: object,
    mediaKind: MediaKind,
    mediaType: MediaType,
  ) {
    const producer = await this.mediasoupService.createProducer(
      roomId,
      transportId,
      clientId,
      userId,
      rtpParameters,
      mediaType,
      mediaKind,
    );
    const participantTrackOptions: ParticipantTrackOptions = {
      enabled: true,
      muted: false,
      clientId,
      userId,
      producerOptions: producer,
      mediaKind,
      mediaType,
    };
    if (mediaType === 'screenShare') {
      await this.roomStore.updateParticipantMedia(
        mediaType,
        roomId,
        clientId,
        userId,
        participantTrackOptions,
      );
    } else {
      await this.roomStore.updateParticipantMedia(
        mediaKind,
        roomId,
        clientId,
        userId,
        participantTrackOptions,
      );
    }
    return producer;
  }

  async createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
    userId: string,
  ) {
    return this.mediasoupService.createConsumer(
      roomId,
      producerId,
      rtpCapabilities,
      clientId,
      userId,
    );
  }

  async getRouter(roomId: string) {
    return this.mediasoupService.getRouter(roomId);
  }

  async getProducer(roomId: string, userId: string) {
    return this.mediasoupService.getProducer(roomId, userId);
  }

  async getProducers(roomId: string) {
    return this.mediasoupService.getProducers(roomId);
  }

  async startRecording(
    roomId: string,
    userId: string,
    producerId?: string,
    audioProducerId?: string,
  ) {
    const recordId = `${uuidv4()}.mp4`;
    await this.roomStore.createRecordId(roomId, recordId);
    return this.mediasoupService.startRecording(
      roomId,
      userId,
      recordId,
      producerId,
      audioProducerId,
    );
  }

  async stopRecording(userId: string, roomId: string) {
    let room;
    if (!roomId) {
      room = await this.roomStore.findRoomByUser(userId);
    } else {
      room = await this.roomStore.findRoomByIdOrThrow(roomId);
    }
    if (!room) throw new Error(' stop record: cannot find room');
    const recordName = getNameAsDate();
    if (room.recordingId) {
      const file = await this.fileStore.addFile(
        `${recordName}.mp4`,
        'video/mp4',
        room.recordingId,
      );
      await this.recordStore.createRecord(userId, recordName, room.recordingId, file.id);
    }
    return this.mediasoupService.stopRecording(roomId, userId);
  }
}
