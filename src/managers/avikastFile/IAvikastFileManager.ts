import {AvikastFile} from '../../entities/AvikastFile';

export default abstract class IAvikastFileManager {
  abstract getAvikastFiles(userId: string): Promise<AvikastFile[]>;
}
