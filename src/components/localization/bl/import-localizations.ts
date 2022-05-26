import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importItems } from '../../import/index.js';
import { insertMethod } from '../../methods/index.js';
import { insertPaper } from '../../papers/index.js';
import { Localization } from '../models.js';
import { insertLocalization } from '../repository/insert-localization.js';

export { importLocalizations };

const schema = joi
  .object()
  .keys({
    proteinId: joi.string().max(50).required(),
    organelleId: joi.string().max(50).required(),
    methodId: joi.string().trim().max(20).required(),
    pubMedId: joi.string().trim().max(50).required(),
  })
  .unknown(true);

const importLocalizations = async (token: string, creator: User, rows: readonly StringAnyMap[]): Promise<readonly Localization[]> => {
  return importItems<Localization>({ token, creator, rows, createItem });
};

const createItem = async (creator: User, raw: StringAnyMap): Promise<Localization> => {
  const req = await verifySchema<Localization>(schema, raw);

  await Promise.all([
    insertPaper({ id: req.pubMedId }), //
    insertMethod({ type: req.methodId }),
  ]);

  return insertLocalization(req);
};
