import {Injectable} from '@nestjs/common';
import {mapAvikastFilesFromDB} from 'database/entities/Mappers';
import IAvikastFileManager from './IAvikastFileManager';
import IAvikastFileStore from '../../database/stores/avikastFile/IAvikastFileStore';

@Injectable()
export default class AvikastFileManager extends IAvikastFileManager {
  constructor(private readonly avikastFileStore: IAvikastFileStore) {
    super();
  }

  async getAvikastFiles(userId: string) {
    const avikastFiles = await this.avikastFileStore.getAvikastFiles(userId);
    console.log(avikastFiles, 'avikastFiles');
    return mapAvikastFilesFromDB(avikastFiles);
  }
}
