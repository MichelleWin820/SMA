import Router from 'koa-router';
import { methodsList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/methods' });

  router.get('/', methodsList);

  return router;
};
