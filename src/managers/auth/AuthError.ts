import ErrorHandler from '../../ErrorHandler';

export enum AuthErrorType {
  TokenExpired,
  AuthFailed,
  RefreshFailed,
  ChangePasswordFailed,
  RestorePasswordFailed,
  JwtPayloadMalformed,
}

export default class AuthError extends ErrorHandler {
  constructor(message: string, public readonly type: AuthErrorType) {
    super(message);
  }
}
