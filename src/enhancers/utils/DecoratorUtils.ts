import { createParamDecorator as nestCreateParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const extractRequest = (request: any) => {
  if (Array.isArray(request)) {
    const [, , { req }] = request;
    return req;
  }
  return request;
};

export const createParamDecorator = (func: (request: Request | any) => any) => {
  return nestCreateParamDecorator((data, request) => {
    return func(extractRequest(request));
  });
};
