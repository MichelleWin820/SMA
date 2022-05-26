import joi from 'joi';
import { Context } from 'koa';
import { ListRequest } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { getMethodsList } from '../repository/get-methods-list.js';

export { methodsList };

const schema = joi.object().keys({
  search: joi.string().trim().max(50).allow('', null),
  sort: joi.string().trim().max(50).default('type'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(100).default(100),
});

/**
 * @apiGroup Methods
 * @apiName GetMethodsList
 * @api {post} /methods/ Get methods list
 * @apiParam {string{0..50}} [sort=type] Sort field. Set prefix "-" for change direction. For example: -type.
 * @apiParam {number{0}} [skip=0] Skip (offset) items
 * @apiParam {number{1-100}} [limit=100] Max items per page (min 1, max 100)
 * @apiParam {string{0..50}} [search] Search string
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"type",
 *   "skip": 0,
 *   "limit": 100
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess (200) {Method[]} list Methods list
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "list": [
 *     {
 *       "type": "GFP",
 *       "description": "..."
 *     },
 *     {
 *       ...
 *     },
 *     {
 *       ...
 *     },
 *     ...
 *   ]
 * }
 */

const methodsList = async (ctx: Context): Promise<void> => {
  const req = await verifySchema<ListRequest>(schema, ctx.request.query);
  const list = await getMethodsList(req);

  ctx.body = { list };
};
