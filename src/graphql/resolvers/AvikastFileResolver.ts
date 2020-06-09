import {Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';
import Session from '../../entities/Session';

import {mapAvikastFilesToGQL} from '../entities/Mappers';
import IAvikastFilesManager from '../../managers/avikastFile/IAvikastFileManager';
import AvikastFile from '../entities/avikastFile/AvikastFile';

@Resolver()
@UseGuards(AuthGuard)
export class AvikastFileResolver {
  constructor(private readonly avikastFilesManager: IAvikastFilesManager) {}

  @Query(() => [AvikastFile])
  async AvikastFiles(@CurrentSession() {userId}: Session) {
    return mapAvikastFilesToGQL(await this.avikastFilesManager.getAvikastFiles(userId));
  }
}
