import {Module, ValidationPipe} from '@nestjs/common';
import {APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import {EnhancersModule} from 'enhancers/EnhancersModule';
import {ManagerModule} from 'managers/ManagerModule';
import {AuthController} from './auth/AuthController';
import {MulterModule} from '@nestjs/platform-express';
// @ts-ignore
import {memoryStorage} from 'multer';
import {ApiExceptionInterceptor} from 'enhancers/interceptors/ApiExceptionInterceptor';
import {RouterModule} from 'router/RouterModule';
import {HealthController} from 'api/HealthController';

@Module({
  imports: [
    //
    EnhancersModule,
    ManagerModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: memoryStorage(),
      }),
    }),
    RouterModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiExceptionInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [
    //
    AuthController,
    HealthController,
  ],
  exports: [],
})
export class ApiModule {}
