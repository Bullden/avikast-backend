import {Request as ExpressRequest} from 'express';
import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';
import SessionInfo from 'entities/SessionInfo';

export interface Request extends ExpressRequest {
  session: SessionInfo | undefined;
  appType: AppType | undefined;
  platform: Platform | undefined;
}
