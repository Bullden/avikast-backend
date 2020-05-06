import {createParamDecorator} from '../utils/DecoratorUtils';
import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';

export interface HttpRequestInfo {
  baseUrl: string;
  appType: AppType;
  platform: Platform;
}

export default createParamDecorator(
  (request): HttpRequestInfo => {
    const baseUrl = `${request.protocol}://${request.get('Host')}`;

    return {
      baseUrl,
      appType: request.appType,
      platform: request.platform,
    };
  },
);
