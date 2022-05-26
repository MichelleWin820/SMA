import joi from 'joi';
import { Context } from 'koa';
import { verifySchema } from '../../../utils/joi.js';
import { getShareData } from '../bl/get-share-data.js';

const schema = joi.object().keys({
  id: joi.string().trim().guid().required(),
});

/**
 * @apiGroup ShareRecord
 * @apiName GetShareRecord
 * @api {get} /share 1. Get share
 * @apiSuccess (200) {ShareData} share data
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "share": {
 *      any field: any value,
 *    }
 * }
 */
export async function getShare(ctx: Context): Promise<void> {
  const req = await verifySchema<{ id: string }>(schema, { id: ctx.params.id });

  const share = await getShareData(req.id);

  ctx.body = { share };
}
