import { Context } from 'koa';

export { checkToken };

/**
 * @apiGroup Authentication
 * @apiName CheckToken
 * @api {post} /auth/check 2. Check Token
 * @apiError (401) InvalidRequestModel Invalid request model.
 * @apiSuccess {User} user User model.
 */

const checkToken = async (ctx: Context): Promise<void> => {
  ctx.body = { user: ctx.state.user };
};
