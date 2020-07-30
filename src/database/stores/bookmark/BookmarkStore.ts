import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import IBookmarkStore from './IBookmarkStore';
import BookmarkModel, {BookmarkSchema} from '../../models/BookmarkModel';
import {mapBookmarkFromModel, mapBookmarksFromModel} from '../../models/Mappers';

export default class BookmarkStore extends IBookmarkStore {
  constructor(
    @InjectModel(BookmarkSchema.name) private bookmarkModel: Model<BookmarkModel>,
  ) {
    super();
  }

  async getBookmarks(userId: string) {
    return mapBookmarksFromModel(
      await this.bookmarkModel.find({user: userId}).populate('user'),
    );
  }

  async findBookmarkByText(text: string) {
    const bookmark = await this.bookmarkModel.findOne({text});
    if (bookmark) {
      return mapBookmarkFromModel(bookmark);
    }
  }

  async addBookmark(bookmark: {
    id: string;
    date: Date;
    topic: string;
    text: string;
    userId: string;
  }) {
    const oldBookmark = await this.findBookmarkByText(bookmark.text);
    if (!oldBookmark) {
      await this.bookmarkModel.create(bookmark);
      return true;
    }
    return false;
  }
}
