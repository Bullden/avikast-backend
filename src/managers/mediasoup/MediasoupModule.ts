import {Module} from '@nestjs/common';
import IMediasoupManager from "./IMediasoupManager";
import MediasoupManager from "./MediasoupManager";

@Module({
  imports: [
    //
  ],
  providers: [
    {
      provide: IMediasoupManager,
      useClass: MediasoupManager,
    },
  ],
  exports: [
    //
    MediasoupManager,
  ],
})
export class MediasoupModule {}
