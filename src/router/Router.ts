// eslint-disable-next-line @typescript-eslint/no-unused-vars
import IRouter, {Absolute, Routes} from './IRouter';
import {Injectable} from '@nestjs/common';
import IConfigService from 'services/config/IConfigService';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppType from 'entities/AppType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const q = (key: string, value: string) => ({key, value});

@Injectable()
export default class Router extends IRouter {
  private readonly globalPrefix: string | undefined;

  constructor(private readonly configService: IConfigService) {
    super();
    this.globalPrefix = configService.getOptional('HTTP_GLOBAL_PREFIX');
  }

  private constructUri(
    absolute: Absolute | undefined,
    elements: string[],
    queries?: {key: string; value: string}[],
  ) {
    let uri: string = '';
    if (absolute) uri += absolute.baseUrl;
    if (this.globalPrefix) uri += `/${this.globalPrefix}`;
    uri += elements.map((el) => `/${el}`).join('');
    if (queries) uri += `?${queries.map(({key, value}) => `${key}=${value}`).join('')}`;
    return uri;
  }
}
