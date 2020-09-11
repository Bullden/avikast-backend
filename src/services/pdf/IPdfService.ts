import Resume from '../../entities/Resume';
import User from '../../entities/User';

export abstract class IPdfService {
  abstract createPdfResume(user: User, resume: Resume, link: string): Promise<string>;
}
