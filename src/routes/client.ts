import { Context, Middleware, Next } from 'koa';
import send from 'koa-send';
import serve from 'koa-static';

export { client, fallback };

// client
const root = new URL('../../../public', import.meta.url).pathname;

const client = () => serve(root);

const fallback = (): Middleware => {
  return async (ctx: Context, next: Next) => {
    if (ctx.path.toLowerCase().startsWith('/api')) {
      return next();
    }
    await send(ctx, `/index.html`, { root });
  };
};
