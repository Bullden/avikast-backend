import { ObservableInput } from 'rxjs';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import ErrorHandler from 'ErrorHandler';
import AuthError, { AuthErrorType } from 'managers/auth/AuthError';

function processAuthError(error: AuthError) {
  switch (error.type) {
    case AuthErrorType.TokenExpired:
    case AuthErrorType.AuthFailed:
    case AuthErrorType.RefreshFailed:
      throw new UnauthorizedException(error.message);
  }
}

export function processError(error: any): ObservableInput<any> {
  if (error instanceof ErrorHandler) {
    if (error instanceof AuthError) {
      processAuthError(error);
    }
    throw new BadRequestException(error.message);
  } else {
    throw error;
  }
}
