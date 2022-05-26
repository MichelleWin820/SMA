import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importItems } from '../../import/index.js';
import { Pathway } from '../models.js';
import { insertPathway } from '../repository/insert-pathway.js';

export { importPathways };

const schema = joi
  .object()
  .keys({
    name: joi.string().required(),
    id: joi.string().trim().max(50).required(),
  })
  .unknown(true);

const importPathways = async (token: string, creator: User, rows: readonly StringAnyMap[]): Promise<readonly Pathway[]> => {
  return importItems<Pathway>({ token, creator, rows, createItem });
};

const createItem = async (creator: User, raw: StringAnyMap): Promise<Pathway> => {
  const req = await verifySchema<Pathway>(schema, raw);
  return insertPathway(req);
};
