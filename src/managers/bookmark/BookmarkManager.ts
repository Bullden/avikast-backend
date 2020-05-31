import {Injectable} from '@nestjs/common';
import {mapBookmarksFromDB} from 'database/entities/Mappers';
import IBookmarkManager from './IBookmarkManager';
import IBookmarkStore from '../../database/stores/bookmark/IBookmarkStore';

@Injectable()
export default class BookmarkManager extends IBookmarkManager {
  constructor(private readonly bookmarkStore: IBookmarkStore) {
    super();
  }

  async getBookmarks(userId: string) {
    const bookmarks = await this.bookmarkStore.getBookmarks(userId);

    return mapBookmarksFromDB(bookmarks);
  }
}
