import Router from 'koa-router';
import { papersList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/papers' });
  router.get('/', papersList);

  return router;
};
