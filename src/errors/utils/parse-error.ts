import httpStatus from 'http-status-codes';
import { appConfig } from '../../config/index.js';
import { only } from '../../utils/only.js';
import { AppError, IAppError } from '../app-error.js';
import { errorToObject } from './error-to-object.js';

export { parseError };

const parseError = (e: any): AppError => {
  const isDevelopEnv = appConfig.env === 'develop' || appConfig.env === 'local';

  let error: any = errorToObject(e);
  error.status = error.status || error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  if (!isDevelopEnv) {
    error = only<IAppError>(error, ['name', 'message', 'code', 'status', 'details', 'desctiption']);
  }

  return error;
};
