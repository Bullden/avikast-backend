import {Module} from '@nestjs/common';
import {StoresModule} from 'database/stores/StoresModule';
import IAccountManager from './account/IAccountManager';
import AccountManager from './account/AccountManager';
import {AuthModule} from './auth/AuthModule';
import {ServicesModule} from 'services/ServicesModule';
import IRoomManager from './room/IRoomManager';
import RoomManager from './room/RoomManager';
import IMediasoupManager from 'managers/mediasoup/IMediasoupManager';
import MediasoupManager from 'managers/mediasoup/MediasoupManager';
import IBookmarkManager from './bookmark/IBookmarkManager';
import BookmarkManager from './bookmark/BookmarkManager';
import IAvikastFileManager from './avikastFile/IAvikastFileManager';
import AvikastFileManager from './avikastFile/AvikastFileManager';

@Module({
  imports: [
    //
    StoresModule,
    AuthModule,
    ServicesModule,
  ],
  providers: [
    {
      provide: IAccountManager,
      useClass: AccountManager,
    },
    {
      provide: IRoomManager,
      useClass: RoomManager,
    },
    {
      provide: IMediasoupManager,
      useClass: MediasoupManager,
    },
    {
      provide: IBookmarkManager,
      useClass: BookmarkManager,
    },
    {
      provide: IAvikastFileManager,
      useClass: AvikastFileManager,
    },
  ],
  exports: [
    //
    IAccountManager,
    AuthModule,
    IRoomManager,
    IMediasoupManager,
    IBookmarkManager,
    IAvikastFileManager,
  ],
})
export class ManagerModule {}
