import {
  createParamDecorator as nestCreateParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import {Request} from '../entities/Request';
import {getRequest} from '../RequestExtractors';

export const createParamDecorator = (func: (request: Request) => unknown) => {
  return nestCreateParamDecorator((data, context: ExecutionContext) => {
    const request = getRequest(context);
    if (!request) throw new Error('Request cannot be undefined');
    return func(request);
  });
};
