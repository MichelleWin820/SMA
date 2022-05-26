import joi from 'joi';
import { Context } from 'koa';
import { ListRequest } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { getGenesList } from '../repository/get-genes-list.js';

export { genesList };

const schema = joi.object().keys({
  search: joi.string().trim().max(50).allow('', null),
  sort: joi.string().trim().max(50).default('name'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(100).default(100),
});

/**
 * @apiGroup Genes
 * @apiName GetGenesList
 * @api {post} /genes/ Get genes list
 * @apiParam {string{0..50}} [sort=name] Sort field. Set prefix "-" for change direction. For example: -name.
 * @apiParam {number{0}} [skip=0] Skip (offset) items
 * @apiParam {number{1-100}} [limit=100] Max items per page (min 1, max 100)
 * @apiParam {string{0..50}} [search] Search string
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"name",
 *   "skip": 0,
 *   "limit": 100
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess (200) {Gene[]} list Genes list
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "list": [
 *     {
 *       "accession": "...",
 *       "name": "gene 1"
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
const genesList = async (ctx: Context): Promise<void> => {
  const req = await verifySchema<ListRequest>(schema, ctx.request.query);
  const list = await getGenesList(req);

  ctx.body = { list };
};
