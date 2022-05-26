import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';

export { getEmptyPapersIds };

const getEmptyPapersIds = async (client?: DbClient): Promise<readonly string[]> => {
  const text = `SELECT "id"
                FROM "public"."papers"
                WHERE "title" IS NULL AND id != 'in house';`;

  const res = await (client || pool).query({ text });

  return res.rows.map((r) => r.id);
};
