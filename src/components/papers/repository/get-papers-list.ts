import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { Paper } from '../models.js';

export { getPapersList };

const getPapersList = async (options?: ListRequest, client?: DbClient): Promise<readonly Paper[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<Paper>(options, ['title']);

  const term = options?.search;
  const where = term
    ? `WHERE "title" ILIKE $1
          OR "id" ILIKE $1
          OR "abstract" ILIKE $1
          OR "journal" ILIKE $1
          OR "volume" ILIKE $1`
    : '';

  const values: string[] = term ? [`%${term}%`] : [];

  const text = `SELECT "id", "title"
                FROM "public"."papers"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });

  return res.rows;
};
