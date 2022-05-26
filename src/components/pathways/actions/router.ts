import Router from 'koa-router';
import { pathwaysList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/pathways' });

  router.get('/', pathwaysList);

  return router;
};
