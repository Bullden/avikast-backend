import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import IAvikastFileStore from './IAvikastFileStore';
import {mapAvikastFilesFromModel} from '../../models/Mappers';
import AvikastFileModel, {AvikastFileSchema} from '../../models/AvikastFileModel';

export default class AvikastFileStore extends IAvikastFileStore {
  constructor(
    @InjectModel(AvikastFileSchema.name)
    private avikastFileModel: Model<AvikastFileModel>,
  ) {
    super();
  }

  async getAvikastFiles(userId: string) {
    const files = mapAvikastFilesFromModel(
      await this.avikastFileModel.find({user: userId}).populate('user'),
    );
    return files;
  }
}
