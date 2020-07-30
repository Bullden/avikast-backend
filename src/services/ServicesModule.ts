import {Module} from '@nestjs/common';
import {ConfigModule} from 'services/config/ConfigModule';
import {MediasoupModule} from './mediasoup/MediasoupModule';
import {StorageModule} from 'services/storage/StorageModule';
import {EmailSenderModule} from 'services/emailSender/EmailSenderModule';
import {NotificationModule} from 'services/notifications/NotificationModule';

@Module({
  imports: [
    //
    ConfigModule,
    MediasoupModule,
    StorageModule,
    EmailSenderModule,
    NotificationModule,
  ],
  providers: [],
  exports: [
    //
    ConfigModule,
    MediasoupModule,
    StorageModule,
    EmailSenderModule,
    NotificationModule,
  ],
})
export class ServicesModule {}
