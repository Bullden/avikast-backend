import {Module} from '@nestjs/common';
import {JwtModule as NestJwtModule, JwtModuleOptions} from '@nestjs/jwt';
import IConfigService from 'services/config/IConfigService';
import {ConfigModule} from 'services/config/ConfigModule';
import {IJwtService} from './IJwtService';
import {JwtService} from './JwtService';

const options = (configService: IConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET'),
  signOptions: {expiresIn: configService.get('JWT_EXPIRES_IN')},
});

@Module({
  imports: [
    //
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [IConfigService],
      useFactory: options,
    }),
  ],
  providers: [
    {
      provide: IJwtService,
      useClass: JwtService,
    },
  ],
  exports: [
    //
    IJwtService,
  ],
})
export class JwtModule {}
