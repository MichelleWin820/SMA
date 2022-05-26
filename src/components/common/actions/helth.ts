import httpStatus from 'http-status-codes';
import { Context } from 'koa';

export { helthStatus };

const helthStatus = async (ctx: Context): Promise<void> => {
  ctx.body = { ok: true };
  ctx.status = httpStatus.OK;
};
