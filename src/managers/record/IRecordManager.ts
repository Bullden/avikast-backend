import Record from '../../entities/Record';

export default abstract class IRecordManager {
  abstract getRecords(userId: string): Promise<Record[]>;
}
