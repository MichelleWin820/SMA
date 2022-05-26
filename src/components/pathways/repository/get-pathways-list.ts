import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { Pathway } from '../models.js';

export { getPathwaysList };

const getPathwaysList = async (options?: ListRequest, client?: DbClient): Promise<readonly Pathway[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<Pathway>(options, ['name']);

  const term = options?.search;
  const where = term ? `WHERE "name" ILIKE $1 OR "id" ILIKE $1` : '';
  const values: string[] = term ? [`%${term}%`] : [];

  const text = `SELECT "id", "name"
                FROM "public"."pathways"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });

  return res.rows;
};
