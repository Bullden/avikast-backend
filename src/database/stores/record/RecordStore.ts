/* eslint-disable class-methods-use-this */

import IRecordStore from 'database/stores/record/IRecordStore';

export default class RecordStore extends IRecordStore {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  async getRecords(userId: string) {
    const records = [
      {id: '1', name: 'first record', date: new Date(434235235), time: '1h 30m'},
      {id: '2', name: 'second record', date: new Date(4234), time: '2h 45m'},
      {id: '3', name: 'third record', date: new Date(4324235), time: '1h'},
      {id: userId, name: 'fourth record', date: new Date(6456546), time: '1h 15m'},
    ];
    return records;
  }
}
