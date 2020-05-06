import {Module} from '@nestjs/common';
import {StoresModule} from 'database/stores/StoresModule';
import IAccountManager from './account/IAccountManager';
import AccountManager from './account/AccountManager';
import {AuthModule} from './auth/AuthModule';
import {ServicesModule} from 'services/ServicesModule';

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
  ],
  exports: [IAccountManager, AuthModule],
})
export class ManagerModule {}
