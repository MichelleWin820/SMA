import Router from 'koa-router';
import { genesList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/genes' });

  router.get('/', genesList);

  return router;
};
