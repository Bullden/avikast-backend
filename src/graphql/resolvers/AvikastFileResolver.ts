import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';

import {mapAvikastFilesToGQL, mapAvikastFileToGQL} from '../entities/Mappers';
import IAvikastFilesManager from '../../managers/avikastFile/IAvikastFileManager';
import AvikastFile from '../entities/avikastFile/AvikastFile';
import SessionInfo from 'entities/SessionInfo';

@Resolver()
@UseGuards(AuthGuard)
export class AvikastFileResolver {
  constructor(private readonly avikastFilesManager: IAvikastFilesManager) {}

  @Query(() => [AvikastFile])
  async avikastFiles(
    @CurrentSession() {userId}: SessionInfo,
    @Args('parent', {type: () => String, nullable: true})
    parent: string | undefined,
  ) {
    return mapAvikastFilesToGQL(await this.avikastFilesManager.getFiles(userId, parent));
  }

  @Mutation(() => AvikastFile)
  async addAvikastFile(
    @CurrentSession() {userId}: SessionInfo,
    @Args('name') name: string,
    @Args('fileId') fileId: string,
    @Args('parent', {type: () => String, nullable: true})
    parent: string | undefined,
  ) {
    return mapAvikastFileToGQL(
      await this.avikastFilesManager.addFile(userId, name, fileId, parent),
    );
  }

  @Mutation(() => AvikastFile)
  async createAvikastDirectory(
    @CurrentSession() {userId}: SessionInfo,
    @Args('name') name: string,
    @Args('parent', {type: () => String, nullable: true})
    parent: string | undefined,
  ) {
    return mapAvikastFileToGQL(
      await this.avikastFilesManager.createDirectory(userId, name, parent),
    );
  }

  @Mutation(() => Boolean)
  async deleteAvikastFile(
    @CurrentSession() {userId}: SessionInfo,
    @Args('id') id: string,
  ) {
    await this.avikastFilesManager.deleteFile(userId, id);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteAvikastDirectory(
    @CurrentSession() {userId}: SessionInfo,
    @Args('id') id: string,
  ) {
    await this.avikastFilesManager.deleteDirectory(userId, id);
    return true;
  }
}
