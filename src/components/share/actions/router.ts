import Router from 'koa-router';
import { getShare } from './get-share.js';
import { putShare } from './put-settings.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/share' });

  router.get('/:id', getShare);
  router.post('/', putShare);

  return router;
};
