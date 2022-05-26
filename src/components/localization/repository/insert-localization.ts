import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Localization } from '../models.js';

export { insertLocalization };

const insertLocalization = async (loc: Localization, client?: DbClient): Promise<Localization> => {
  const text = `INSERT INTO "public"."localization"("proteinId", "organelleId", "pubMedId", "methodId")
                VALUES ($1, $2, $3, $4)
                ON CONFLICT DO NOTHING;`;

  const values = [
    loc.proteinId, //
    loc.organelleId,
    loc.pubMedId,
    loc.methodId,
  ];

  await (client || pool).query({ text, values });

  return loc;
};
