import Record from 'database/entities/Record';

export default abstract class IRecordStore {
  abstract getRecords(userId: string): Promise<Record[]>;
}
