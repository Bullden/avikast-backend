import Bookmark from 'database/entities/Bookmark';

export default abstract class IBookmarkStore {
  abstract getBookmarks(userId: string): Promise<Bookmark[]>;
}
