import Bookmark from '../../entities/Bookmark';

export default abstract class IBookmarkManager {
  abstract getBookmarks(userId: string): Promise<Bookmark[]>;

  abstract addBookmark(text: string, userId: string, roomId: string): Promise<boolean>;
}
