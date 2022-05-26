import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { RxnPrnPwy } from '../models.js';

export { insertReactionLink };

const insertReactionLink = async (rxn: RxnPrnPwy, client?: DbClient): Promise<RxnPrnPwy> => {
  const text = `INSERT INTO "public"."rxnprnpwy"("reactionId", "proteinId", "pathwayId")
                VALUES ($1, $2, $3)
                ON CONFLICT DO NOTHING;`;

  const values = [
    rxn.reactionId, //
    rxn.proteinId,
    rxn.pathwayId,
  ];

  await (client || pool).query({ text, values });

  return rxn;
};
