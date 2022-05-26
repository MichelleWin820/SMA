import { Context } from 'koa';
import { putShareData } from '../bl/put-share-data.js';

/**
 * @apiGroup ShareRecord
 * @apiName PutShareRecord
 * @api {post} /share 2. Put share data
 * @apiParam {Any} values Any settings values in json format
 * @apiParamExample {json} Request-Example:
 * {
 *   "any field1": value1,
 *   "any field2": value2,
 *   "any field3": value3,
 *   ...
 * }
 * @apiSuccess (200) {ShareData} share data
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "id": "string"
 * }
 */
export async function putShare(ctx: Context): Promise<void> {
  const share = await putShareData(ctx.request.body);
  ctx.body = { id: share.id };
}
