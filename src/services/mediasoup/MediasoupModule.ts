import {Module} from '@nestjs/common';
import IMediasoupService from './IMediasoupService';
import MediasoupService from './MediasoupService';
import {IConfigService} from '@spryrocks/config-node';
import {ClientProxyFactory, Transport} from '@nestjs/microservices';
import {MEDIASOUP_SERVICE} from './Constants';
import {ConfigModule} from '../config/ConfigModule';

@Module({
  imports: [
    //
    ConfigModule,
  ],
  providers: [
    {
      provide: MEDIASOUP_SERVICE,
      inject: [IConfigService],
      useFactory: (configService: IConfigService) => {
        const tcpHost = configService.get('MICROSERVICES_TCP_HOST');
        const tcpPort = configService.getNumber('MICROSERVICES_TCP_PORT');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: tcpHost,
            port: tcpPort,
          },
        });
      },
    },
    {
      provide: IMediasoupService,
      useClass: MediasoupService,
    },
  ],
  exports: [IMediasoupService],
})
export class MediasoupModule {}
