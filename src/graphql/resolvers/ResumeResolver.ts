import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import SessionInfo from 'entities/SessionInfo';
import {ResumeInput, ResumeOutput} from '../entities/resume/Resume';
import IResumeManager from '../../managers/resume/IResumeManager';

@Resolver()
@UseGuards(AuthGuard)
export class ResumeResolver {
  constructor(private readonly resumeManager: IResumeManager) {}

  @Mutation(() => Boolean)
  async saveResume(
    @CurrentSession() {userId}: SessionInfo,
    @Args('resume') resume: ResumeInput,
  ): Promise<Boolean> {
    await this.resumeManager.createResume(userId, resume);
    return true;
  }

  @Query(() => ResumeOutput, {nullable: true})
  async getResume(@CurrentSession() {userId}: SessionInfo) {
    const resume = await this.resumeManager.getResume(userId);
    return resume;
  }

  @Query(() => String, {nullable: true})
  async getResumeLink(@CurrentSession() {userId}: SessionInfo) {
    const link = await this.resumeManager.getResumeLink(userId);
    return link;
  }
}
