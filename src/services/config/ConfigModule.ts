import {Module} from '@nestjs/common';
import {getNodeEnv} from 'services/config/ConfigUtils';
import {createConfigService, IConfigService} from '@spryrocks/config-node';

@Module({
  providers: [
    {
      provide: IConfigService,
      useValue: createConfigService(getNodeEnv(), undefined),
    },
  ],
  exports: [IConfigService],
})
export class ConfigModule {}
