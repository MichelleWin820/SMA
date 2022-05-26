import Router from 'koa-router';
import { reactionsList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/reactions' });

  router.get('/', reactionsList);

  return router;
};
