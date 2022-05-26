import { Context } from 'koa';
import { logError } from './log-error.js';
import { isTrustedError } from './utils/is-trusted-error.js';
import { parseError } from './utils/parse-error.js';

export { catchError, catchUncaughtException, catchUnhandledRejection };

const catchError = (ctx: Context, e: unknown): void => {
  const error = parseError(e);
  ctx.app.emit('error', error, ctx);

  if (!ctx.writable) return;

  if (error.status !== void 0) {
    ctx.status = error.status;
  }

  ctx.body = { error };
};

const catchUncaughtException = (error: Error): void => {
  logError(error);
  if (!isTrustedError(error)) {
    process.exit(1);
  }
};

const catchUnhandledRejection = (reason: Error): void => {
  logError(reason);
};
