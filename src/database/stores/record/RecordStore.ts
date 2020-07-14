import IRecordStore from 'database/stores/record/IRecordStore';
import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import RecordModel, {CreateRecordModel, RecordSchema} from 'database/models/RecordModel';
import {mapRecordsFromModel} from 'database/models/Mappers';

export default class RecordStore extends IRecordStore {
  constructor(
    @InjectModel(RecordSchema.name)
    private recordModel: Model<RecordModel>,
  ) {
    super();
  }

  private readonly populateRecord: QueryPopulateOptions[] = [
    {path: 'file'},
    {path: 'user'},
  ];

  async createRecord(
    userId: string,
    recordName: string,
    recordingId: string,
    fileId: string,
  ) {
    const updateObject: CreateRecordModel = {
      id: recordingId,
      name: recordName,
      date: new Date(),
      user: userId,
      file: fileId,
    };
    await this.recordModel.create(updateObject);
  }

  async getRecords(userId: string) {
    const rec = await this.recordModel.find({user: userId}).populate(this.populateRecord);
    return mapRecordsFromModel(rec);
  }
}
