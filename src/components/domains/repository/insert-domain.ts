import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Domain } from '../models.js';

export { insertDomain };

const insertDomain = async (domain: Domain, client?: DbClient): Promise<Domain> => {
  const text = `INSERT INTO "public"."domains"("id", "name", "proteinId")
                VALUES ($1, $2, $3)
                ON CONFLICT ("id")
                DO UPDATE SET "name"      = excluded."name",
                              "proteinId" = excluded."proteinId";`;

  const values = [
    domain.id, //
    domain.name,
    domain.proteinId,
  ];

  await (client || pool).query({ text, values });

  return domain;
};
