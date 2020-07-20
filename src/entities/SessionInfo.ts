import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';

export default interface SessionInfo {
  token: string;
  userId: string;
  appType: AppType;
  platform: Platform;
}
