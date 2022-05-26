import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Reaction } from '../models.js';

export { insertReaction };

const insertReaction = async (rxn: Reaction, client?: DbClient): Promise<Reaction> => {
  const text = `INSERT INTO "public"."reactions"("id", "name", "ecNumber", "metaDomain")
                VALUES ($1, $2, $3, $4)
                ON CONFLICT ("id")
                DO UPDATE SET "name"          = excluded."name",
                              "ecNumber"      = excluded."ecNumber",
                              "metaDomain"    = excluded."metaDomain";`;

  const values = [
    rxn.id, //
    rxn.name,
    rxn.ecNumber,
    rxn.metaDomain,
  ];

  await (client || pool).query({ text, values });

  return rxn;
};
