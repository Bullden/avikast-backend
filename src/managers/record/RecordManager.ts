import {Injectable} from '@nestjs/common';
import IRecordManager from 'managers/record/IRecordManager';
import IRecordStore from 'database/stores/record/IRecordStore';
import {mapRecordsFromDb} from 'database/entities/Mappers';

@Injectable()
export default class RecordManager extends IRecordManager {
  constructor(private readonly recordStore: IRecordStore) {
    super();
  }

  async getRecords(userId: string) {
    const records = await this.recordStore.getRecords(userId);
    return mapRecordsFromDb(records);
  }
}
