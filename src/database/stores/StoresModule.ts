import {Module} from '@nestjs/common';
import {DatabaseModule} from '../DatabaseModule';
import ILoginStore from './login/ILoginStore';
import LoginStore from './login/LoginStore';
import ISessionStore from 'database/stores/session/ISessionStore';
import SessionStore from 'database/stores/session/SessionStore';
import IUserStore from './user/IUserStore';
import UserStore from './user/UserStore';
import IRoomStore from './room/IRoomStore';
import RoomStore from './room/RoomStore';
import IBookmarkStore from './bookmark/IBookmarkStore';
import BookmarkStore from './bookmark/BookmarkStore';
import IAvikastFileStore from './avikastFile/IAvikastFileStore';
import AvikastFileStore from './avikastFile/AvikastFileStore';
import IMessageStore from './message/IMessageStore';
import MessageStore from './message/MessageStore';
import IRecordStore from 'database/stores/record/IRecordStore';
import RecordStore from 'database/stores/record/RecordStore';

@Module({
  imports: [
    //
    DatabaseModule,
  ],
  providers: [
    {
      provide: IUserStore,
      useClass: UserStore,
    },
    {
      provide: ILoginStore,
      useClass: LoginStore,
    },
    {
      provide: ISessionStore,
      useClass: SessionStore,
    },
    {
      provide: IRoomStore,
      useClass: RoomStore,
    },
    {
      provide: IBookmarkStore,
      useClass: BookmarkStore,
    },
    {
      provide: IAvikastFileStore,
      useClass: AvikastFileStore,
    },
    {
      provide: IMessageStore,
      useClass: MessageStore,
    },
    {
      provide: IRecordStore,
      useClass: RecordStore,
    },
  ],
  exports: [
    //
    ISessionStore,
    ILoginStore,
    IUserStore,
    IRoomStore,
    IBookmarkStore,
    IAvikastFileStore,
    IMessageStore,
    IRecordStore,
  ],
})
export class StoresModule {}
