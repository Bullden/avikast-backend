import {Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import Session from '../../entities/Session';
import {mapRecordsToGQL} from 'graphql/entities/Mappers';
import IRecordManager from 'managers/record/IRecordManager';
import Record from '../entities/record/Record';

@Resolver()
@UseGuards(AuthGuard)
export class RecordResolver {
  constructor(private readonly recordManager: IRecordManager) {}

  @Query(() => [Record])
  async records(@CurrentSession() {userId}: Session) {
    return mapRecordsToGQL(await this.recordManager.getRecords(userId));
  }
}
