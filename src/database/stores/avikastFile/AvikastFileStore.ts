import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import IAvikastFileStore from './IAvikastFileStore';
import {mapAvikastFilesFromModel} from '../../models/Mappers';
import AvikastFileModel, {AvikastFileSchema} from '../../models/AvikastFileModel';

export default class AvikastFileStore extends IAvikastFileStore {
  constructor(
    @InjectModel(AvikastFileSchema.name)
    private AvikastFileModel: Model<AvikastFileModel>,
  ) {
    super();
  }

  async getAvikastFiles(userId: string) {
    const files = mapAvikastFilesFromModel(
      await this.AvikastFileModel.find({user: userId}).populate('user'),
    );
    console.log(files, 'files store');
    return files;
  }
}
