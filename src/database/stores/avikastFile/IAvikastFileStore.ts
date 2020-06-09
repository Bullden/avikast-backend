import AvikastFile from 'database/entities/AvikastFile';

export default abstract class IAvikastFileStore {
  abstract getAvikastFiles(userId: string): Promise<AvikastFile[]>;
}
