import Resume from '../../entities/Resume';

export default abstract class IResumeManager {
  abstract createResume(userId: string, resume: Resume): Promise<void>;

  abstract getResume(userId: string): Promise<Resume | undefined>;

  abstract getResumeLink(userId: string): Promise<string | undefined>;
}
