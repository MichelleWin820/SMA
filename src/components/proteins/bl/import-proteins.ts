import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importItems } from '../../import/index.js';
import { Protein } from '../models.js';
import { insertProtein } from '../repository/insert-protein.js';

export { importProteins };

const schema = joi
  .object()
  .keys({
    uniProtId: joi.string().trim().max(50).required(),
    accession: joi.string().trim().max(50).required(),
    geneId: joi.string().trim().max(50).required(),
    name: joi.string().max(255).allow('', null),
    description: joi.string().allow('', null),
    length: joi
      .string()
      .max(16)
      .pattern(/^[0-9]+$/),
    sequence: joi.string().allow('', null),
    species: joi.string().allow('', null),
    isEnzyme: joi.string().allow('TRUE', 'FALSE', null),
  })
  .unknown(true);

const importProteins = async (token: string, creator: User, rows: readonly StringAnyMap[]): Promise<readonly Protein[]> => {
  return importItems<Protein>({ token, creator, rows, createItem });
};

const createItem = async (creator: User, raw: StringAnyMap): Promise<Protein> => {
  const req = await verifySchema<Protein>(schema, raw);
  return insertProtein(req);
};
