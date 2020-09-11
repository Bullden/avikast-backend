import Resume from 'entities/Resume';

export default abstract class IResumeStore {
  abstract createResume(userId: string, resume: Resume, name: string): Promise<void>;

  abstract findResumeByUserId(userId: string): Promise<Resume | undefined>;
}
