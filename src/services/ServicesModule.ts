import {Module} from '@nestjs/common';
import {ConfigModule} from 'services/config/ConfigModule';
import {MediasoupModule} from './mediasoup/MediasoupModule';
import {StorageModule} from 'services/storage/StorageModule';

@Module({
  imports: [
    //
    ConfigModule,
    MediasoupModule,
    StorageModule,
  ],
  providers: [],
  exports: [
    //
    ConfigModule,
    MediasoupModule,
    StorageModule,
  ],
})
export class ServicesModule {}
