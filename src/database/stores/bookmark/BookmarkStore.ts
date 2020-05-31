import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import IBookmarkStore from './IBookmarkStore';
import BookmarkModel, {BookmarkSchema} from '../../models/BookmarkModel';
import {mapBookmarksFromModel} from '../../models/Mappers';

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
}
