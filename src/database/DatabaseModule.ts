import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import IConfigService from 'services/config/IConfigService';
import { ConfigModule } from 'services/config/ConfigModule';

import LocalLogin from './entities/LocalLogin';
import Session from './entities/Session';
import User from './entities/User';

const entities: any = [
  //
  User,
  LocalLogin,
  Session,
];

const options = (configService: IConfigService): TypeOrmModuleOptions => ({
  type: 'mongodb',
  host: configService.get('DATABASE_HOST'),
  port: configService.getNumber('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  // synchronize: configService.getBoolean('DATABASE_SYNCHRONIZE', false),
  logging: 'all',
  useUnifiedTopology: true,
  entities,
  useNewUrlParser: true,
});

@Module({
  imports: [
    //
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [IConfigService],
      useFactory: options,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [
    //
    TypeOrmModule,
  ],
})
export class DatabaseModule {}
