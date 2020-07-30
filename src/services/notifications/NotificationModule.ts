import {Module} from '@nestjs/common';
import INotificationService from './INotificationService';
import NotificationService from './NotificationService';
import {StoresModule} from 'database/stores/StoresModule';
import {EmailSenderModule} from 'services/emailSender/EmailSenderModule';

@Module({
  imports: [
    //
    StoresModule,
    EmailSenderModule,
  ],
  providers: [
    {
      provide: INotificationService,
      useClass: NotificationService,
    },
  ],
  exports: [INotificationService],
})
export class NotificationModule {}
