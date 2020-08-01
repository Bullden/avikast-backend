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

  async getFiles(userId: string) {
    const files = await this.avikastFileStore.getFiles(userId);
    return mapAvikastFilesFromDB(files);
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
