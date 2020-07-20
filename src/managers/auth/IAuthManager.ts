import {ID} from 'entities/Common';
import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';
import SessionInfo from 'entities/SessionInfo';
import AuthResponse from 'entities/AuthResponse';
import Session from 'entities/Session';

export default abstract class IAuthManager {
  abstract register(
    appType: AppType,
    platform: Platform,
    email: string,
    password: string,
    name: string,
    referralCode: string,
  ): Promise<AuthResponse>;

  abstract login(
    appType: AppType,
    platform: Platform,
    email: string,
    password: string,
  ): Promise<AuthResponse>;

  abstract getSessionFromTokenOrThrow(jwt: string): Promise<SessionInfo>;

  abstract validateSessionOrThrow(jwt: string): Promise<SessionInfo>;

  abstract refresh(refreshToken: string): Promise<Session>;

  abstract recoverPassword(email: string): Promise<void>;

  abstract async changePassword(
    userId: ID,
    oldPassword: string,
    password: string,
  ): Promise<void>;

  abstract updateFirebaseToken(token: string, registrationId: string): Promise<void>;
}
