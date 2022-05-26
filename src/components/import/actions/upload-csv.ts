import { unlink } from 'fs';
import joi from 'joi';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { basename } from 'path';
import { AppBadRequest } from '../../../errors/app-error.js';
import { StringTMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { importDomains } from '../../domains/index.js';
import { importGenes } from '../../genes/index.js';
import { importLocalizations } from '../../localization/index.js';
import { importPathways } from '../../pathways/index.js';
import { importProteins } from '../../proteins/index.js';
import { importReactions } from '../../reactions/index.js';
import { importTags } from '../../tags/bl/import-tags.js';
import { readCSV } from '../bl/read-csv.js';
import { ImportRequest, ImportResponse, ProcessImportCSV } from '../models.js';

export { uploadCSV };

const IMPORTS: StringTMap<ProcessImportCSV> = {
  genes: importGenes,
  domains: importDomains,
  proteins: importProteins,
  pathways: importPathways,
  reactions: importReactions,
  localizations: importLocalizations,
  tags: importTags,
};

const schema = joi.object().keys({
  escape: joi.string().allow('"', '""', '').default('"'),
  delimiter: joi.string().allow(',', ';', '|', '\t').default(','),
  table: joi
    .string()
    .allow(...Object.keys(IMPORTS))
    .required(),
});

const uploadCSV = async (ctx: ParameterizedContext<DefaultState, DefaultContext, ImportResponse>): Promise<void> => {
  const file = ctx.request.files?.file;
  if (!file) throw new AppBadRequest('Empty request');
  if (Array.isArray(file)) throw new AppBadRequest('Array of files not allowed');

  const req = await verifySchema<ImportRequest>(schema, ctx.request.body);

  const imp = IMPORTS[req.table];
  if (!imp) throw new AppBadRequest('Invalid import name');

  try {
    const csv = await readCSV(file, req);
    const token = basename(file.path).replace('uload_', '');

    imp(token, ctx.state.user, csv); // don't wait

    ctx.body = { token };
  } finally {
    unlink(file.path, () => void 0);
  }
};
