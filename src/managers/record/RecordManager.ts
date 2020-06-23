import {Injectable} from '@nestjs/common';
import IRecordManager from 'managers/record/IRecordManager';
import IRecordStore from 'database/stores/record/IRecordStore';

@Injectable()
export default class RecordManager extends IRecordManager {
  constructor(private readonly recordStore: IRecordStore) {
    super();
  }

  async getRecords(userId: string) {
    return this.recordStore.getRecords(userId);
  }
}
