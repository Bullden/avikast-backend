import Record from '../../entities/Record';

export default abstract class IRecordManager {
  abstract getRecords(userId: string): Promise<Record[]>;

  abstract deleteRecord(userId: string, id: string): Promise<void>;
}
