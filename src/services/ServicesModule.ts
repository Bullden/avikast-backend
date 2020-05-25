import {Module} from '@nestjs/common';
import {ConfigModule} from 'services/config/ConfigModule';
import {MediasoupModule} from './mediasoup/MediasoupModule';

@Module({
  imports: [
    //
    ConfigModule,
    MediasoupModule,
  ],
  providers: [],
  exports: [
    //
    ConfigModule,
    MediasoupModule,
  ],
})
export class ServicesModule {}
