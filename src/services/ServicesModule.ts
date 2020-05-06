import {Module} from '@nestjs/common';
import {ConfigModule} from 'services/config/ConfigModule';

@Module({
  imports: [
    //
    ConfigModule,
  ],
  providers: [],
  exports: [
    //
    ConfigModule,
  ],
})
export class ServicesModule {}
