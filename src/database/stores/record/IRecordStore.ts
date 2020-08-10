import Record from 'database/entities/Record';

export default abstract class IRecordStore {
  abstract createRecord(
    userId: string,
    recordName: string,
    recordingId: string,
    mimeType: string,
  ): Promise<void>;

  abstract getRecords(userId: string): Promise<Record[]>;

  abstract findRecordByIdOrThrow(id: string): Promise<Record>;

  abstract deleteRecord(id: string): Promise<void>;
}
