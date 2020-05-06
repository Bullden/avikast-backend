import {Module} from '@nestjs/common';
import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';
import IConfigService from 'services/config/IConfigService';
import {ConfigModule} from 'services/config/ConfigModule';

// const entities: any = [
//   //
//   User,
//   LocalLogin,
//   Session,
// ];

const options = (configService: IConfigService): MongooseModuleOptions => ({
  type: 'mongodb',
  host: configService.get('DATABASE_HOST'),
  port: configService.getNumber('DATABASE_PORT'),
  user: configService.get('DATABASE_USERNAME'),
  pass: configService.get('DATABASE_PASSWORD'),
  dbName: configService.get('DATABASE_NAME'),
  // synchronize: configService.getBoolean('DATABASE_SYNCHRONIZE', false),
  useUnifiedTopology: true,
  // entities,
  useNewUrlParser: true,
});

@Module({
  imports: [
    //
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [IConfigService],
      useFactory: options,
    }),
  ],
  exports: [
    //
    MongooseModule,
  ],
})
export class DatabaseModule {}
