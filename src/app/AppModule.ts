import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/DatabaseModule';
import { ApiModule } from '../api/ApiModule';
@Module({
  imports: [
    //
    DatabaseModule, // todo: remove this line
    ApiModule,
  ],
})
export class AppModule {}
