import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import {AppModule} from './AppModule';
import express from 'express';
import http from 'http';
import {getNodeEnv} from 'services/config/ConfigUtils';
import {createConfigService} from 'services/config/ConfigServiceFactory';
import {httpLogger} from './AppUtils';

export async function initApplication() {
  const configService = createConfigService(getNodeEnv());

  const server = express().set('trust proxy', true);

  const globalPrefix = configService.getOptional('HTTP_GLOBAL_PREFIX');
  const httpPort = configService.getNumber('HTTP_PORT');
  const httpsPort = configService.getNumber('HTTPS_PORT');

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }
  await app.use(httpLogger()).init();

  const ports = {
    http: httpPort,
    https: httpsPort,
  };

  http.createServer(server).listen(ports.http);
}
