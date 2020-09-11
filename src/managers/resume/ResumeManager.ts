import {Injectable} from '@nestjs/common';
import IResumeStore from '../../database/stores/resume/IResumeStore';
import {IPdfService} from '../../services/pdf/IPdfService';
import Resume from '../../entities/Resume';
import IUserStore from '../../database/stores/user/IUserStore';
import IResumeManager from './IResumeManager';
import {v4 as uuidv4} from 'uuid';
import IFileStore from '../../database/stores/file/IFileStore';
import IAvikastFileStore from '../../database/stores/avikastFile/IAvikastFileStore';
import {AvikastFileType} from '../../entities/AvikastFile';

@Injectable()
export default class ResumeManager extends IResumeManager {
  constructor(
    private readonly userStore: IUserStore,
    private readonly resumeStore: IResumeStore,
    private readonly pdfService: IPdfService,
    private readonly fileStore: IFileStore,
    private readonly avikastFileStore: IAvikastFileStore,
  ) {
    super();
  }

  async createResume(userId: string, resume: Resume) {
    const user = await this.userStore.findUserByIdOrThrow(userId);
    const mediaLink = uuidv4();
    const pdfName = await this.pdfService.createPdfResume(user, resume, mediaLink);
    const file = await this.fileStore.addResume(
      `${user.name}-resume.pdf`,
      'pdf',
      mediaLink,
    );
    await this.avikastFileStore.createFile(
      userId,
      `${user.name}-resume`,
      AvikastFileType.File,
      file.id,
      undefined,
    );
    await this.resumeStore.createResume(userId, resume, pdfName);
  }

  async getResume(userId: string) {
    const resume = await this.resumeStore.findResumeByUserId(userId);
    return resume;
  }

  async getResumeLink(userId: string) {
    const user = await this.userStore.findUserByIdOrThrow(userId);
    const file = await this.fileStore.getResumeLink(user);
    const avikastFile = await this.avikastFileStore.findFileByIdOrThrow(file);
    return avikastFile.id;
  }
}
