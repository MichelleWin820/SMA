import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { ShareRecord } from '../models.js';

export { getShareRecord };

const getShareRecord = async (id: string, client?: DbClient): Promise<ShareRecord | undefined> => {
  const text = `SELECT *
                FROM "public"."share"
                WHERE "id" = $1
                LIMIT 1;`;

  const values = [id];

  const res = await (client || pool).query({ text, values });
  const row: ShareRecord = res.rows[0];

  return row;
};
