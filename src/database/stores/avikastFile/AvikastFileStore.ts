import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import IAvikastFileStore from './IAvikastFileStore';
import {mapAvikastFileFromModel, mapAvikastFilesFromModel} from '../../models/Mappers';
import AvikastFileModel, {
  AvikastFileSchema,
  CreateAvikastFileModel,
} from '../../models/AvikastFileModel';
import {AvikastFileType} from 'entities/AvikastFile';

export default class AvikastFileStore extends IAvikastFileStore {
  constructor(
    @InjectModel(AvikastFileSchema.name)
    private avikastFileModel: Model<AvikastFileModel>,
  ) {
    super();
  }

  private readonly populateAvikastFile: QueryPopulateOptions[] = [
    {
      path: 'user',
    },
    {
      path: 'file',
    },
  ];

  async findFileByIdOrThrow(id: string) {
    const file = await this.avikastFileModel
      .findById(id)
      .populate(this.populateAvikastFile);
    if (!file) throw new Error('file is not exists');
    return mapAvikastFileFromModel(file);
  }

  async getFiles(userId: string, parent: string | undefined) {
    return mapAvikastFilesFromModel(
      await this.avikastFileModel
        .find({user: userId, parent})
        .populate(this.populateAvikastFile),
    );
  }

  async getImages(userId: string) {
    const files = await this.avikastFileModel
      .find({user: userId})
      .populate(this.populateAvikastFile);
    return mapAvikastFilesFromModel(files);
  }

  async createFile(
    userId: string,
    name: string,
    type: AvikastFileType,
    fileId: string | undefined,
    parent: string | undefined,
  ) {
    const model: CreateAvikastFileModel = {
      name,
      type,
      user: userId,
      file: fileId,
      parent,
    };
    const file = await this.avikastFileModel.create(model);
    return mapAvikastFileFromModel(
      await file.populate(this.populateAvikastFile).execPopulate(),
    );
  }

  async deleteFile(id: string) {
    await this.avikastFileModel.deleteOne({_id: id});
  }
}
