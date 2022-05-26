import Router from 'koa-router';
import { helthStatus } from './helth.js';

export { createRouter };

const createRouter = () => {
  const router = new Router();
  router.get('/status', helthStatus);

  return router;
};
