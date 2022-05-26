import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importItems } from '../../import/index.js';
import { Tag } from '../models.js';
import { insertTag } from '../repository/insert-tag.js';

export { importTags };

const proteinSchema = joi
  .object()
  .keys({
    proteinId: joi.string().max(50).required(),
    name: joi.string().max(512).required(),
  })
  .unknown(true);

const geneSchema = joi
  .object()
  .keys({
    geneId: joi.string().max(50).required(),
    name: joi.string().max(512).required(),
  })
  .unknown(true);

const schema = joi.alternatives().try(proteinSchema, geneSchema);

const importTags = async (token: string, creator: User, rows: readonly StringAnyMap[]): Promise<readonly Tag[]> => {
  return importItems<Tag>({ token, creator, rows, createItem });
};

const createItem = async (creator: User, raw: StringAnyMap): Promise<Tag> => {
  const req = await verifySchema<Tag>(schema, raw);
  return insertTag(req);
};
