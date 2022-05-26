import httpStatus from 'http-status-codes';
import { IAppError } from '../../errors/index.js';

export const SESSION_REQUIRED: IAppError = {
  message: 'Session id is missing.',
  code: 'SessionIdRequired',
  status: httpStatus.UNAUTHORIZED,
};

export const INVALID_SESSION: IAppError = {
  message: 'Session id is invalid.',
  code: 'InvalidSessionId',
  status: httpStatus.UNAUTHORIZED,
};

export const ACCESS_DENIED: IAppError = {
  message: 'Access denied.',
  code: 'AccessDenied',
  status: httpStatus.FORBIDDEN,
};
