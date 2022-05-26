import httpStatus from 'http-status-codes';
import { IAppError } from './app-error.js';

export const BAD_REQUEST = httpStatus.BAD_REQUEST;
export const NOT_FOUND = httpStatus.NOT_FOUND;
export const FORBIDDEN = httpStatus.FORBIDDEN;
export const UNAUTHORIZED = httpStatus.UNAUTHORIZED;
export const NOT_IMPLEMENTED = httpStatus.NOT_IMPLEMENTED;
export const TOO_MANY_REQUESTS = httpStatus.TOO_MANY_REQUESTS;
export const INTERNAL_SERVER_ERROR = httpStatus.INTERNAL_SERVER_ERROR;
export const NO_CONTENT = httpStatus.NO_CONTENT;

export const APP_RUNTIME_ERROR: IAppError = {
  message: 'Runtime error.',
  code: 'APPError',
  expose: true,
  status: INTERNAL_SERVER_ERROR,
};

export const APP_NOT_IMPLEMENTED: IAppError = {
  message: 'Not Implemented yet.',
  code: 'NotImplemented',
  status: NOT_IMPLEMENTED,
};

export const APP_RESOURCE_NOT_FOUND: IAppError = {
  message: 'Resource not found.',
  code: 'ResourceNotFound',
  status: NOT_FOUND,
};

export const APP_INVALID_REQ_MODEL: IAppError = {
  message: 'Invalid request model.',
  code: 'InvalidRequestModel',
  status: BAD_REQUEST,
};

export const APP_TOO_MANY_REQUESTS: IAppError = {
  message: 'Too many requests.',
  code: 'RateLimit',
  status: TOO_MANY_REQUESTS,
};

export const APP_ACCESS_DENIED: IAppError = {
  message: 'Access denied.',
  code: 'AccessDenied',
  status: FORBIDDEN,
};

export const APP_UNAUTHORIZED_REQUEST: IAppError = {
  message: 'Unauthorized request.',
  code: 'Unauthorized',
  status: UNAUTHORIZED,
};
