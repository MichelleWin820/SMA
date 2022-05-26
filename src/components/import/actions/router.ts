import Router from 'koa-router';
import { checkApiSessionMiddleware } from '../../auth/index.js';
import { importTable } from './import-table.js';
import { uploadCSV } from './upload-csv.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/import' });
  router.post('/csv', checkApiSessionMiddleware, uploadCSV);
  router.post('/:table', checkApiSessionMiddleware, importTable);

  return router;
};
