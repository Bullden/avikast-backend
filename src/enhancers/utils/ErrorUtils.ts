import {ObservableInput} from 'rxjs';
import {BadRequestException, UnauthorizedException} from '@nestjs/common';
import AvikastError from 'AvikastError';
import AvikastAuthError, {AvikastErrorType} from 'managers/auth/AvikastAuthError';

function processAuthError(error: AvikastAuthError) {
  switch (error.type) {
    case AvikastErrorType.TokenExpired:
    case AvikastErrorType.AuthFailed:
    case AvikastErrorType.RefreshFailed:
      throw new UnauthorizedException(error.message);
  }
}

export function processError(error: any): ObservableInput<any> {
  if (error instanceof AvikastError) {
    if (error instanceof AvikastAuthError) {
      processAuthError(error);
    }
    throw new BadRequestException(error.message);
  } else {
    throw error;
  }
}
