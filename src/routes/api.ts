import Router from 'koa-router';
import { createRouter as auth } from '../components/auth/actions/router.js';
import { createRouter as common } from '../components/common/actions/router.js';
import { createRouter as domains } from '../components/domains/actions/router.js';
import { createRouter as genes } from '../components/genes/actions/router.js';
import { createRouter as imports } from '../components/import/actions/router.js';
import { createRouter as methods } from '../components/methods/actions/router.js';
import { createRouter as pathways } from '../components/pathways/actions/router.js';
import { createRouter as search } from '../components/proteins/actions/router.js';
import { createRouter as reactions } from '../components/reactions/actions/router.js';
import { createRouter as share } from '../components/share/actions/router.js';

export { api };

const nested: Router[] = [
  auth(), //
  common(),
  domains(),
  genes(),
  search(),
  imports(),
  share(),
  methods(),
  reactions(),
  pathways(),
];

const api = new Router({ prefix: '/api' });
for (const router of nested) {
  api.use(router.routes());
}
