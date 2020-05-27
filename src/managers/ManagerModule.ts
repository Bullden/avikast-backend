import {Module} from '@nestjs/common';
import {StoresModule} from 'database/stores/StoresModule';
import IAccountManager from './account/IAccountManager';
import AccountManager from './account/AccountManager';
import {AuthModule} from './auth/AuthModule';
import {ServicesModule} from 'services/ServicesModule';
import IRoomManager from './room/IRoomManager';
import TestManager from './room/RoomManager';

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
      useClass: TestManager,
    },
  ],
  exports: [
    //
    IAccountManager,
    AuthModule,
    IRoomManager,
  ],
})
export class ManagerModule {}
