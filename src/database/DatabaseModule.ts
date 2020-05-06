import {Module} from '@nestjs/common';
import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';
import IConfigService from 'services/config/IConfigService';
import {ConfigModule} from 'services/config/ConfigModule';
import {UserSchema} from './models/UserModel';
import {LocalLoginSchema} from './models/LocalLoginModel';
import {SessionSchema} from './models/SessionModel';

const options = (configService: IConfigService): MongooseModuleOptions => {
  const host = configService.get('DATABASE_HOST');
  const port = configService.getNumber('DATABASE_PORT');
  const databaseName = configService.get('DATABASE_NAME');

  const uri = `mongodb://${host}:${port}/${databaseName}`;

  return {
    uri,
    user: configService.get('DATABASE_USERNAME'),
    pass: configService.get('DATABASE_PASSWORD'),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  };
};

@Module({
  imports: [
    //
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [IConfigService],
      useFactory: options,
    }),
    MongooseModule.forFeature([
      //
      UserSchema,
      LocalLoginSchema,
      SessionSchema,
    ]),
  ],
  exports: [
    //
    MongooseModule,
  ],
})
export class DatabaseModule {}
