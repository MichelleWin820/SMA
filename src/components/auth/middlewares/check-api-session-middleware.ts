import { Context } from 'koa';
import { AppError } from '../../../errors/app-error.js';
import { APP_UNAUTHORIZED_REQUEST } from '../../../errors/common-errors.js';
import { SESSION_REQUIRED } from '../errors.js';
import { takeToken } from '../utils/take-token.js';
import { verifyToken } from '../utils/verify-token.js';

export { checkApiSessionMiddleware };

const checkApiSessionMiddleware = async (ctx: Context, next: () => Promise<unknown>): Promise<void> => {
  const token = takeToken(ctx);
  if (!token) throw new AppError(SESSION_REQUIRED);

  try {
    const user = await verifyToken(token);
    ctx.state.sid = token;
    ctx.state.user = user;
  } catch (error) {
    throw new AppError(APP_UNAUTHORIZED_REQUEST);
  }

  await next();
};
