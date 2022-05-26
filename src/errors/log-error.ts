import { logger } from '../log/index.js';
import { errorToObject } from './utils/error-to-object.js';
import { isTrustedError } from './utils/is-trusted-error.js';

export { logError, isLogError };

const logError = (error: Error): void => {
  if (isLogError(error)) {
    (logger || console)?.error(errorToObject(error));
  }
};

const isLogError = (error: Error | number): boolean => {
  return !isTrustedError(error) || error >= 500;
};
