import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importItems } from '../../import/index.js';
import { Domain } from '../models.js';
import { insertDomain } from '../repository/insert-domain.js';

export { importDomains };

const schema = joi
  .object()
  .keys({
    id: joi.string().max(50).required(),
    name: joi.string().max(255).allow('', null),
    proteinId: joi.string().max(50).allow('', null),
  })
  .unknown(true);

const importDomains = async (token: string, creator: User, rows: readonly StringAnyMap[]): Promise<readonly Domain[]> => {
  return importItems<Domain>({ token, creator, rows, createItem });
};

const createItem = async (creator: User, raw: StringAnyMap): Promise<Domain> => {
  const req = await verifySchema<Domain>(schema, raw);
  return insertDomain(req);
};
