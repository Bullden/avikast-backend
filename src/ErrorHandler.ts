export enum AuthErrorType {
  TokenExpired,
  AuthFailed,
  RefreshFailed,
  ChangePasswordFailed,
  RestorePasswordFailed,
  JwtPayloadMalformed,
}

export default class ErrorHandler extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
