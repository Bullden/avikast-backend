import IAuthManager from './IAuthManager';
import AuthResponse from '../../entities/AuthResponse';
import IUserStore from '../../database/stores/user/IUserStore';
import {Injectable} from '@nestjs/common';
import ILoginStore from '../../database/stores/login/ILoginStore';
import * as bcrypt from 'bcrypt';
import DbUser from '../../database/entities/User';
import AvikastError from '../../AvikastError';
import LocalLogin from '../../database/entities/LocalLogin';
import ISessionStore from '../../database/stores/session/ISessionStore';
import {IJwtService} from './jwt/IJwtService';
import {JwtPayload} from './jwt/JwtPayload';
import {pbkdf2Sync, randomBytes} from 'crypto';
import Session from '../../database/entities/Session';
import AvikastAuthError, {AvikastErrorType} from './AvikastAuthError';
import {generate as generatePassword} from 'generate-password';
import {ID} from 'entities/Common';
import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';
import User from 'entities/User';
import SessionInfo from 'entities/SessionInfo';

@Injectable()
export default class AuthManager extends IAuthManager {
  constructor(
    private readonly userStore: IUserStore,
    private readonly loginStore: ILoginStore,
    private readonly sessionStore: ISessionStore,
    private readonly jwtService: IJwtService,
  ) {
    super();
  }

  async register(
    appType: AppType,
    platform: Platform,
    email: string,
    password: string,
    name: string,
    referralCode: string,
  ): Promise<AuthResponse> {
    // if (await this.loginStore.findLocalLoginByEmail(email)) {
    //   throw new AvikastError('User with the same email already exists');
    // }

    let referrer: User | undefined;
    if (referralCode && referralCode.length > 0) {
      referrer = await this.userStore.findUserByReferralCode(referralCode);
      if (!referrer) {
        throw new AvikastError('This referralCode is not exists');
      }
    }

    const generatedReferralCode = AuthManager.generateReferralCode();

    const user = await this.userStore.createUser({
      name,
      email,
      country: ' ',
      city: ' ',
      dateOfBirth: new Date(),
      avatarUrl: ' ',
      tags: [],
      skills: [],
      referralCode: generatedReferralCode,
      referrer: referrer ? referrer.id : undefined,
    });
    const login = await this.createLocalLogin(user, email, password);
    return this.createSession(login.user, appType, platform);
  }

  async login(appType: AppType, platform: Platform, email: string, password: string) {
    const login = await this.findLoginOrThrow({email}, AvikastErrorType.AuthFailed);

    await AuthManager.checkPasswordOrThrow(login, password, AvikastErrorType.AuthFailed);
    return this.createSession(login.user, appType, platform);
  }

  private static async checkPasswordOrThrow(
    login: LocalLogin,
    password: string,
    errorType: AvikastErrorType,
  ) {
    if (!(await AuthManager.isPasswordValid(login, password))) {
      throw new AvikastAuthError('Password is not valid', errorType);
    }
  }

  private async findLoginOrThrow(
    user: {email?: string; id?: ID},
    errorType: AvikastErrorType,
  ): Promise<LocalLogin> {
    let login;
    if (user.email) {
      login = await this.loginStore.getLocalLoginByEmail(user.email);
    } else if (user.id) {
      login = await this.loginStore.getLocalLoginByUser({id: user.id});
    }

    if (!login) {
      throw new AvikastAuthError('Login not found', errorType);
    }

    return login;
  }

  private async createLocalLogin(user: DbUser, email: string, password: string) {
    const passwordHash = await AuthManager.createPasswordHash(password);

    return this.loginStore.createLocalLogin(user, email, passwordHash);
  }

  private static async createPasswordHash(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private static async isPasswordValid(login: LocalLogin, password: string) {
    return bcrypt.compare(password, login.passwordHash);
  }

  private static createCryptoToken(): string {
    const tmp = randomBytes(32).toString('hex');
    return pbkdf2Sync(tmp, tmp, 2048, 32, 'sha512').toString('hex');
  }

  private async createSession(
    user: DbUser,
    appType: AppType,
    platform: Platform,
  ): Promise<AuthResponse> {
    return this.createSessionInfo(appType, platform, user, (token, refreshToken) =>
      this.sessionStore.createSession(user, token, refreshToken, appType, platform),
    );
  }

  public async refresh(refreshToken: string) {
    const session = await this.sessionStore.getSessionByRefreshToken(refreshToken);
    if (!session) {
      throw new AvikastAuthError('Session not found', AvikastErrorType.RefreshFailed);
    }
    const sessionInfo = await this.createSessionInfo(
      session.appType,
      session.platform,
      session.user,
      (token: string, refreshToken: string) =>
        this.sessionStore.updateSession(session, token, refreshToken),
    );
    return {
      jwt: sessionInfo.jwt,
      refreshToken: sessionInfo.refreshToken,
    };
  }

  private async createSessionInfo(
    appType: AppType,
    platform: Platform,
    user: User,
    createOrUpdateSession: (token: string, refreshToken: string) => Promise<Session>,
  ): Promise<AuthResponse> {
    const token = AuthManager.createCryptoToken();
    const refreshToken = AuthManager.createCryptoToken();
    const session = await createOrUpdateSession(token, refreshToken);
    if (!session) {
      throw new AvikastError('Session wasn`t created!');
    }
    const payload: JwtPayload = {
      userId: user.id,
      sessionToken: session.token,
      appType: AppType[appType],
      platform: Platform[platform],
    };
    const jwt = await this.jwtService.sign(payload);
    return {jwt, refreshToken, user};
  }

  async getSessionFromTokenOrThrow(jwt: string) {
    try {
      const {
        userId,
        sessionToken,
        appType: appTypeString,
        platform: platformString,
      } = await this.jwtService.verify(jwt);

      const appType = AppType[appTypeString as AppType];
      if (!appType)
        throw new AvikastAuthError(
          'JWT payload should contains a valid appType',
          AvikastErrorType.JwtPayloadMalformed,
        );

      const platform = Platform[platformString as Platform];
      if (!platform)
        throw new AvikastAuthError(
          'JWT payload should contains a valid platform',
          AvikastErrorType.JwtPayloadMalformed,
        );

      const session: SessionInfo = {
        token: sessionToken,
        userId,
        appType,
        platform,
      };

      return session;
    } catch (e) {
      if (e.message === 'jwt expired') {
        throw new AvikastAuthError('JWT token expired', AvikastErrorType.TokenExpired);
      }
      throw new AvikastError(e.message);
    }
  }

  async validateSessionOrThrow(jwt: string) {
    const session = await this.getSessionFromTokenOrThrow(jwt);

    const dbSession = await this.sessionStore.getSessionByToken(session.token);
    if (!dbSession)
      throw new AvikastAuthError('Session not found', AvikastErrorType.AuthFailed);
    if (dbSession.user.id !== session.userId)
      throw new AvikastAuthError('User malformed', AvikastErrorType.AuthFailed);
    if (dbSession.appType !== session.appType)
      throw new AvikastAuthError('appType malformed', AvikastErrorType.AuthFailed);

    return session;
  }

  private static generateNewPassword() {
    return generatePassword({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
    });
  }

  private static generateReferralCode() {
    return generatePassword({
      length: 12,
      numbers: true,
      lowercase: false,
      uppercase: false,
    });
  }

  async recoverPassword(email: string) {
    const login = await this.findLoginOrThrow(
      {email},
      AvikastErrorType.RestorePasswordFailed,
    );

    const password = AuthManager.generateNewPassword();

    this.updatePassword(login, password);
  }

  async updatePassword(login: LocalLogin, password: string) {
    const passwordHash = await AuthManager.createPasswordHash(password);
    await this.loginStore.updateLocalLoginPassword(login, passwordHash);
  }

  async changePassword(userId: ID, oldPassword: string, password: string) {
    const login = await this.findLoginOrThrow(
      {id: userId},
      AvikastErrorType.ChangePasswordFailed,
    );

    await AuthManager.checkPasswordOrThrow(
      login,
      oldPassword,
      AvikastErrorType.ChangePasswordFailed,
    );

    await this.updatePassword(login, password);
  }

  async updateFirebaseToken(token: string, registrationId: string) {
    const session = await this.sessionStore.getSessionByTokenOrThrow(token);
    await this.sessionStore.updateFirebaseToken(session, registrationId);
  }
}
