import {Module} from '@nestjs/common';
import IConfigService from 'services/config/IConfigService';
import {getNodeEnv} from 'services/config/ConfigUtils';
import {createConfigService} from 'services/config/ConfigServiceFactory';

@Module({
  providers: [
    {
      provide: IConfigService,
      useValue: createConfigService(getNodeEnv()),
    },
  ],
  exports: [IConfigService],
})
export class ConfigModule {}
