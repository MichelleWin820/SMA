import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importItems } from '../../import/index.js';
import { Reaction, RxnPrnPwy } from '../models.js';
import { insertReactionLink } from '../repository/insert-reaction-link.js';
import { insertReaction } from '../repository/insert-reaction.js';

export { importReactions };

type ReactionUnionType = Reaction & Omit<RxnPrnPwy, 'reactionId'>;

const schema = joi
  .object()
  .keys({
    id: joi.string().trim().max(50).required(),
    name: joi.string().required(),
    ecNumber: joi.string().trim().max(50).allow('', null),
    metaDomain: joi.string().trim().max(255).allow('', null),
    proteinId: joi.string().max(50).allow('', null).optional(),
    pathwayId: joi.string().max(50).allow('', null).optional(),
  })
  .unknown(true);

const importReactions = async (token: string, creator: User, rows: readonly StringAnyMap[]): Promise<readonly Reaction[]> => {
  return importItems<Reaction>({ token, creator, rows, createItem });
};

const createItem = async (creator: User, raw: StringAnyMap): Promise<Reaction> => {
  const req = await verifySchema<Reaction | ReactionUnionType>(schema, raw);

  const reaction = await insertReaction(req);

  const linkReq = req as ReactionUnionType;
  if (linkReq.proteinId || linkReq.pathwayId) {
    await insertReactionLink({
      reactionId: req.id,
      proteinId: linkReq.proteinId || void 0,
      pathwayId: linkReq.pathwayId || void 0,
    });
  }

  return reaction;
};
