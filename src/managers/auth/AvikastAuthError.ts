import AvikastError from '../../AvikastError';

export enum AvikastErrorType {
  TokenExpired,
  AuthFailed,
  RefreshFailed,
  ChangePasswordFailed,
  RestorePasswordFailed,
  JwtPayloadMalformed,
}

export default class AvikastAuthError extends AvikastError {
  constructor(message: string, public readonly type: AvikastErrorType) {
    super(message);
  }
}
