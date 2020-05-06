import {
  createParamDecorator as nestCreateParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import {Request} from 'express';
import {getRequest} from '../RequestExtractors';

export const createParamDecorator = (func: (request: Request | any) => any) => {
  return nestCreateParamDecorator((data, context: ExecutionContext) => {
    return func(getRequest(context));
  });
};
