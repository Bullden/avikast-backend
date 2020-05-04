export enum AvikastErrorType {
  TokenExpired,
  AuthFailed,
  RefreshFailed,
  ChangePasswordFailed,
  RestorePasswordFailed,
  JwtPayloadMalformed,
}

export default class AvikastError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
