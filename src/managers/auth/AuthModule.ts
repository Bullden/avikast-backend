import {Module} from '@nestjs/common';
import {StoresModule} from 'database/stores/StoresModule';
import IAuthManager from './IAuthManager';
import AuthManager from './AuthManager';
import {JwtModule} from './jwt/JwtModule';
import {ServicesModule} from 'services/ServicesModule';

@Module({
  imports: [
    //
    JwtModule,
    StoresModule,
    ServicesModule,
  ],
  providers: [
    {
      provide: IAuthManager,
      useClass: AuthManager,
    },
  ],
  exports: [
    //
    IAuthManager,
  ],
})
export class AuthModule {}
