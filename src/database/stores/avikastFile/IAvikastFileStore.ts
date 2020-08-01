import AvikastFile from 'database/entities/AvikastFile';
import {AvikastFileType} from 'entities/AvikastFile';

export default abstract class IAvikastFileStore {
  abstract findFileByIdOrThrow(id: string): Promise<AvikastFile>;

  abstract getFiles(userId: string, parent: string | undefined): Promise<AvikastFile[]>;

  abstract createFile(
    userId: string,
    name: string,
    type: AvikastFileType,
    fileId: string | undefined,
    parent: string | undefined,
  ): Promise<AvikastFile>;

  abstract deleteFile(id: string): Promise<void>;
}
