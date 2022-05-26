import Router from 'koa-router';
import { proteinsList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/proteins' });

  router.post('/', proteinsList);

  return router;
};
