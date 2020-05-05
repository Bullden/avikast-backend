import { Module } from '@nestjs/common';
import { DatabaseModule } from '../DatabaseModule';
import ILoginStore from './login/ILoginStore';
import LoginStore from './login/LoginStore';
import ISessionStore from 'database/stores/session/ISessionStore';
import SessionStore from 'database/stores/session/SessionStore';
import IUserStore from './user/IUserStore';
import UserStore from './user/UserStore';

@Module({
  imports: [
    //
    DatabaseModule,
  ],
  providers: [
    {
      provide: ISessionStore,
      useClass: SessionStore,
    },
    {
      provide: ILoginStore,
      useClass: LoginStore,
    },
    {
      provide: IUserStore,
      useClass: UserStore,
    },
  ],
  exports: [ISessionStore, ILoginStore, IUserStore],
})
export class StoresModule {}
