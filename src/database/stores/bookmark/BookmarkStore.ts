import {InjectModel} from '@nestjs/mongoose';
import {Model, QueryPopulateOptions} from 'mongoose';
import IBookmarkStore from './IBookmarkStore';
import BookmarkModel, {BookmarkSchema} from '../../models/BookmarkModel';
import {mapBookmarkFromModel, mapBookmarksFromModel} from '../../models/Mappers';

export default class BookmarkStore extends IBookmarkStore {
  constructor(
    @InjectModel(BookmarkSchema.name) private bookmarkModel: Model<BookmarkModel>,
  ) {
    super();
  }

  private readonly populateBookmark: QueryPopulateOptions[] = [
    {path: 'bookmarks'},
    {path: 'user'},
  ];

  async getBookmarks(userId: string) {
    console.log('get bookmarks store');
    return mapBookmarksFromModel(
      await this.bookmarkModel.find({user: userId}).populate(this.populateBookmark),
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
    user: string;
  }) {
    await this.bookmarkModel.create(bookmark);
    return true;
  }
}
