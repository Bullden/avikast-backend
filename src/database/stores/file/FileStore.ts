import IFileStore from 'database/stores/file/IFileStore';
import {Injectable} from '@nestjs/common';
import {Model, QueryPopulateOptions} from 'mongoose';
import FileModel, {CreateFileModel, FileSchema} from 'database/models/FileModel';
import {InjectModel} from '@nestjs/mongoose';
import {mapFileFromModel} from 'database/models/Mappers';
import User from '../../entities/User';

@Injectable()
export default class FileStore implements IFileStore {
  constructor(
    @InjectModel(FileSchema.name)
    private fileModel: Model<FileModel>,
  ) {}

  private readonly populateFiles: QueryPopulateOptions = {
    path: 'files',
  };

  async addFile(name: string, mimeType: string, mediaLink: string) {
    const newFile: CreateFileModel = {
      mediaLink,
      name,
      mimeType,
    };
    return mapFileFromModel(await this.fileModel.create(newFile));
  }

  async getFile(file: {id: string}) {
    const result = await this.fileModel.findById(file.id);
    return result ? mapFileFromModel(result) : undefined;
  }

  async addResume(name: string, mimeType: string, mediaLink: string) {
    const oldResume = await this.fileModel.findOne({name});
    const newFile: CreateFileModel = {
      mediaLink,
      name,
      mimeType,
    };
    // if (!oldResume) {
    //   console.log('update old resume');
    //   await this.fileModel.findOneAndUpdate({name}, {newFile});
    //   return;
    // }
    console.log('create new file');

    return mapFileFromModel(await this.fileModel.create(newFile));
  }

  async getResumeLink(user: User) {
    const link = await this.fileModel.findOne({
      name: `${user.name}-resume`,
      mimeType: 'pdf',
    });
    const mapedFile = mapFileFromModel(await this.fileModel.create(link));
    console.log('filestore link', mapedFile.mediaLink);
    return mapedFile.mediaLink;
  }
}
