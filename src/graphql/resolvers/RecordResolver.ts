import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import {mapRecordsToGQL} from 'graphql/entities/Mappers';
import IRecordManager from 'managers/record/IRecordManager';
import Record from '../entities/record/Record';
import SessionInfo from 'entities/SessionInfo';

@Resolver()
@UseGuards(AuthGuard)
export class RecordResolver {
  constructor(private readonly recordManager: IRecordManager) {}

  @Query(() => [Record])
  async records(@CurrentSession() {userId}: SessionInfo) {
    return mapRecordsToGQL(await this.recordManager.getRecords(userId));
  }

  @Mutation(() => Boolean)
  async deleteRecord(@CurrentSession() {userId}: SessionInfo, @Args('id') id: string) {
    await this.recordManager.deleteRecord(userId, id);
    return true;
  }
}
