import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { ShareRecord } from '../models.js';

export async function insertShareRecord(val: string, client?: DbClient): Promise<ShareRecord> {
  const text = `INSERT INTO "public"."share"("value")
                VALUES ($1)
                ON CONFLICT ("value")
                DO UPDATE SET "created" = now()
                RETURNING *;`;

  const values = [val];

  const res = await (client || pool).query({ text, values });

  return res.rows[0] as ShareRecord;
}
