import { Context } from 'koa';
import { appConfig } from '../../../config/index.js';

export { takeToken };

const takeToken = (ctx: Context): string | undefined => {
  return ctx.cookies.get(appConfig.auth.cookieName);
};
