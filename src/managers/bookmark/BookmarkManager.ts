import {Injectable} from '@nestjs/common';
import {mapBookmarksFromDB} from 'database/entities/Mappers';
import IBookmarkManager from './IBookmarkManager';
import IBookmarkStore from '../../database/stores/bookmark/IBookmarkStore';
import IUserStore from 'database/stores/user/IUserStore';
import {v4 as uuidv4} from 'uuid';
import IRoomStore from 'database/stores/room/IRoomStore';

@Injectable()
export default class BookmarkManager extends IBookmarkManager {
  constructor(
    private readonly bookmarkStore: IBookmarkStore,
    private readonly userStore: IUserStore,
    private readonly roomStore: IRoomStore,
  ) {
    super();
  }

  async getBookmarks(userId: string) {
    const bookmarks = await this.bookmarkStore.getBookmarks(userId);
    console.log('get bookmarks manager', bookmarks);
    return mapBookmarksFromDB(bookmarks);
  }

  async addBookmark(text: string, userId: string, roomId: string) {
    const room = await this.roomStore.findRoomByIdOrThrow(roomId);
    return this.bookmarkStore.addBookmark({
      id: uuidv4(),
      date: new Date(),
      topic: room.name,
      text,
      user: userId,
    });
  }
}
