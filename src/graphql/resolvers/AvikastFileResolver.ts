import {Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';

import {mapAvikastFilesToGQL} from '../entities/Mappers';
import IAvikastFilesManager from '../../managers/avikastFile/IAvikastFileManager';
import AvikastFile from '../entities/avikastFile/AvikastFile';
import SessionInfo from 'entities/SessionInfo';

@Resolver()
@UseGuards(AuthGuard)
export class AvikastFileResolver {
  constructor(private readonly avikastFilesManager: IAvikastFilesManager) {}

  @Query(() => [AvikastFile])
  async AvikastFiles(@CurrentSession() {userId}: SessionInfo) {
    return mapAvikastFilesToGQL(await this.avikastFilesManager.getAvikastFiles(userId));
  }
}
