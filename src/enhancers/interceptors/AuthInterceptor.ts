import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import IAuthManager from '../../managers/auth/IAuthManager';
import {
  extractAppFromContext,
  extractJwtFromContext,
  extractPlatformHeaderFromContext,
  getRequest,
} from '../RequestExtractors';
import Session from '../../entities/Session';
import AvikastError from 'AvikastError';
import AppType from 'entities/AppType';
import {processError} from '../utils/ErrorUtils';
import {IgnoreElement, Role} from 'entities/Common';
import {Reflector} from '@nestjs/core';
import {Platform} from 'entities/Platform';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly authManager: IAuthManager,
    private readonly reflector: Reflector,
  ) {}

  // @ts-ignore
  public async intercept(context: ExecutionContext, next: CallHandler) {
    try {
      const ignoreElements = this.getIgnoreElements(context);
      const ignoreAppType = ignoreElements && ignoreElements.includes('AppType');
      const ignorePlatform = ignoreElements && ignoreElements.includes('Platform');
      const ignoreAuthorization =
        ignoreElements && ignoreElements.includes('Authorization');

      let session: Session | undefined;

      let appType: AppType | undefined;
      if (!ignoreAppType) {
        appType = AuthInterceptor.extractAppTypeFromContext(context);
      }

      let platform: Platform | undefined;
      if (!ignorePlatform) {
        platform = AuthInterceptor.extractPlatformFromContext(context);
      }

      if (!ignoreAuthorization) {
        const jwt = extractJwtFromContext(context);
        if (jwt) {
          session = await this.authManager.validateSessionOrThrow(jwt);
        }
      }

      if (session) {
        if (!ignoreAppType && (!appType || session.appType !== appType)) {
          throw new AvikastError('appType malformed');
        }
        if (!ignorePlatform && (!platform || session.platform !== platform)) {
          throw new AvikastError('platform malformed');
        }
      }

      const roles = this.getRoles(context);

      if (appType && roles) {
        AuthInterceptor.checkRoles(appType, roles);
      }

      const injectRequestData = (request: any) => {
        if (!ignoreAuthorization) {
          request.session = session;
        }
        if (!ignoreAppType) {
          request.appType = appType;
        }
        if (!ignorePlatform) {
          request.platform = platform;
        }
      };

      const request = getRequest(context);
      if (request) {
        injectRequestData(request);
      }

      return next.handle();
    } catch (e) {
      processError(e);
    }
  }

  private static extractAppTypeFromContext(context: ExecutionContext): AppType {
    const app = extractAppFromContext(context);
    if (!app) {
      throw new AvikastError('app header is not provided');
    }
    const appType = AppType[app as AppType];
    if (!appType) {
      throw new AvikastError('app header contains unknown value');
    }
    return appType;
  }

  private static extractPlatformFromContext(context: ExecutionContext): Platform {
    const platformHeader = extractPlatformHeaderFromContext(context);
    if (!platformHeader) {
      throw new AvikastError('platform header is not provided');
    }
    const platform = Platform[platformHeader as Platform];
    if (!platform) {
      throw new AvikastError('platform header contains unknown value');
    }
    return platform;
  }

  getRoles(context: ExecutionContext): Role[] | undefined {
    const getRolesFunc = (target: Function) =>
      this.reflector.get<Role[] | undefined>('roles', target);
    return [
      //
      getRolesFunc(context.getHandler()),
      getRolesFunc(context.getClass()),
    ]
      .filter((r) => !!r)
      .shift();
  }

  getIgnoreElements(context: ExecutionContext): IgnoreElement[] | undefined {
    const getIgnoreElementsFunc = (target: Function) =>
      this.reflector.get<IgnoreElement[] | undefined>('ignore', target);
    return [
      //
      getIgnoreElementsFunc(context.getHandler()),
      getIgnoreElementsFunc(context.getClass()),
    ]
      .filter((r) => !!r)
      .shift();
  }

  static checkRoles(appType: AppType, roles: Role[]) {
    if (!roles.includes(appType)) {
      throw new AvikastError(`Execution of this method denied for the role '${appType}'`);
    }
  }
}
