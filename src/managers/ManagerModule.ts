import {Module} from '@nestjs/common';
import {StoresModule} from 'database/stores/StoresModule';
import IAccountManager from './account/IAccountManager';
import AccountManager from './account/AccountManager';
import {AuthModule} from './auth/AuthModule';
import {ServicesModule} from 'services/ServicesModule';
import ITestManager from './test/ITestManager';
import TestManager from './test/TestManager';

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
      provide: ITestManager,
      useClass: TestManager,
    },
  ],
  exports: [
    //
    IAccountManager,
    AuthModule,
    ITestManager,
  ],
})
export class ManagerModule {}
