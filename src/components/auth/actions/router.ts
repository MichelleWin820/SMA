import Router from 'koa-router';
import { checkApiSessionMiddleware } from '../middlewares/check-api-session-middleware.js';
import { checkToken } from './check-token.js';
import { signIn } from './signin.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/auth' });

  router.post('/signin', signIn);
  router.get('/check', checkApiSessionMiddleware, checkToken);

  return router;
};
