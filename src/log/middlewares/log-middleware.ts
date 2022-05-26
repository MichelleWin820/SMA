import httpStatus from 'http-status-codes';
import { Context } from 'koa';
import { performance } from 'perf_hooks';
import { logger } from '../index.js';

export { logMiddleware };

const logMiddleware = async (ctx: Context, next: () => Promise<unknown>): Promise<void> => {
  let status = ctx.status;
  const start = performance.now();

  try {
    await next();
  } catch (e) {
    status = e.status || e.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    throw e;
  } finally {
    const end = performance.now();
    const duration = Math.round(end - start);
    logger.debug(`${ctx.method}:${status} ${duration}ms ${ctx.path}`);
  }
};
