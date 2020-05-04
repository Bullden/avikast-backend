import { Module } from '@nestjs/common';
import { DatabaseModule } from '../DatabaseModule';
import ILoginStore from './login/ILoginStore';
import LoginStore from './login/LoginStore';
import ISessionStore from './session/ISessionStore';
import SessionStore from './session/SessionStore';

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
  ],
  exports: [ISessionStore, ILoginStore],
})
export class StoresModule {}
