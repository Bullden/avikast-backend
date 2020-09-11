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
import MessageManager from 'managers/message/MessageManager';
import IMessageManager from 'managers/message/IMessageManager';
import IRecordManager from 'managers/record/IRecordManager';
import RecordManager from 'managers/record/RecordManager';
import IFileManager from './file/IFileManager';
import FileManager from './file/FileManager';
import ILogger from 'utils/ILogger';
import Logger from 'utils/Logger';
import IResumeManager from './resume/IResumeManager';
import ResumeManager from './resume/ResumeManager';

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
    {
      provide: IAvikastFileManager,
      useClass: AvikastFileManager,
    },
    {
      provide: IMessageManager,
      useClass: MessageManager,
    },
    {
      provide: IRecordManager,
      useClass: RecordManager,
    },
    {
      provide: IFileManager,
      useClass: FileManager,
    },
    {
      provide: IResumeManager,
      useClass: ResumeManager,
    },
    {
      provide: ILogger,
      useClass: Logger,
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
    IMessageManager,
    IRecordManager,
    IFileManager,
    ILogger,
    IResumeManager,
  ],
})
export class ManagerModule {}
