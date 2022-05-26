import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Gene } from '../models.js';

export { insertGene };

const insertGene = async (gene: Gene, client?: DbClient): Promise<Gene> => {
  const text = `INSERT INTO "public"."genes"("accession", "name", "symbol")
                VALUES ($1, $2, $3)
                ON CONFLICT ("accession")
                DO UPDATE SET "name"      = excluded."name",
                              "symbol"    = excluded."symbol";`;

  const values = [gene.accession, gene.name, gene.symbol];

  await (client || pool).query({ text, values });
  return gene;
};
