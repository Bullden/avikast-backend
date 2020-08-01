import {AvikastFile} from 'entities/AvikastFile';

export default abstract class IAvikastFileManager {
  abstract getFiles(userId: string, parent: string | undefined): Promise<AvikastFile[]>;

  abstract addFile(
    userId: string,
    name: string,
    fileId: string,
    parent: string | undefined,
  ): Promise<AvikastFile>;

  abstract createDirectory(
    userId: string,
    name: string,
    parent: string | undefined,
  ): Promise<AvikastFile>;
}
