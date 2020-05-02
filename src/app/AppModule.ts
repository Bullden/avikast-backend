import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/DatabaseModule';

@Module({
  imports: [
    //
    DatabaseModule, // todo: remove this line
  ],
})
export class AppModule {}
