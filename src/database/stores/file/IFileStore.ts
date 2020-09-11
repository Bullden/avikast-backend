import File from '../../entities/File';
import User from '../../entities/User';

export default abstract class IFileStore {
  abstract addFile(name: string, mimeType: string, mediaLink: string): Promise<File>;

  abstract getFile(file: {id: string}): Promise<File | undefined>;

  abstract addResume(name: string, mimeType: string, mediaLink: string): Promise<File>;

  abstract getResumeLink(user: User): Promise<string>;
}
