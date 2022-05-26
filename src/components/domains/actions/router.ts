import Router from 'koa-router';
import { domainsList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/domains' });
  router.get('/', domainsList);

  return router;
};
