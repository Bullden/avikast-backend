import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import IResumeStore from 'database/stores/resume/IResumeStore';
import {mapResumeFromModel} from '../../models/Mappers';
import Resume from 'entities/Resume';
import ResumeModel, {ResumeSchema} from 'database/models/ResumeModel';

export default class ResumeStore extends IResumeStore {
  constructor(@InjectModel(ResumeSchema.name) private resumeModel: Model<ResumeModel>) {
    super();
  }

  private readonly populateResume: QueryPopulateOptions[] = [
    {path: 'resume'},
    {path: 'user'},
  ];

  async createResume(userId: string, resume: Resume, fileName: string) {
    const newResume = {
      user: userId,
      summary: resume.summary,
      experience: resume.experience,
      education: resume.education,
      awards: resume.awards,
      fileName,
    };
    const oldResume = await this.resumeModel.findOne({user: userId});
    if (oldResume) {
      await this.resumeModel.findOneAndUpdate({user: userId}, newResume, {
        new: true,
      });
    } else await this.resumeModel.create(newResume);
  }

  async findResumeByUserId(userId: string) {
    const resume = await this.resumeModel.findOne({user: userId});
    return resume ? mapResumeFromModel(resume) : undefined;
  }
}
