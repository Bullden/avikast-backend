import {Injectable} from '@nestjs/common';
import {mapAvikastFilesFromDB} from 'database/entities/Mappers';
import IAvikastFileManager from './IAvikastFileManager';
import IAvikastFileStore from '../../database/stores/avikastFile/IAvikastFileStore';
import {AvikastFileType} from 'entities/AvikastFile';

@Injectable()
export default class AvikastFileManager extends IAvikastFileManager {
  constructor(private readonly avikastFileStore: IAvikastFileStore) {
    super();
  }

  async getFiles(userId: string, parent: string | undefined) {
    return mapAvikastFilesFromDB(await this.avikastFileStore.getFiles(userId, parent));
  }

  async addFile(
    userId: string,
    name: string,
    fileId: string,
    parent: string | undefined,
  ) {
    return this.avikastFileStore.createFile(
      userId,
      name,
      AvikastFileType.File,
      fileId,
      parent,
    );
  }

  async createDirectory(userId: string, name: string, parent: string | undefined) {
    return this.avikastFileStore.createFile(
      userId,
      name,
      AvikastFileType.Directory,
      undefined,
      parent,
    );
  }
}
