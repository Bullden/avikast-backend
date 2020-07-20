import {Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from '../../enhancers/guards/AuthGuard';
import CurrentSession from '../../enhancers/decorators/CurrentSession';

import {mapBookmarksToGQL} from '../entities/Mappers';
import IBookmarkManager from '../../managers/bookmark/IBookmarkManager';
import Bookmark from '../entities/bookmark/Bookmark';
import SessionInfo from 'entities/SessionInfo';

@Resolver()
@UseGuards(AuthGuard)
export class BookmarkResolver {
  constructor(private readonly bookmarksManager: IBookmarkManager) {}

  @Query(() => [Bookmark])
  async bookmarks(@CurrentSession() {userId}: SessionInfo) {
    return mapBookmarksToGQL(await this.bookmarksManager.getBookmarks(userId));
  }
}
