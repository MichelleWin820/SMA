import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Method } from '../models.js';

export { insertMethod };

const insertMethod = async (method: Method, client?: DbClient): Promise<Method> => {
  const text = `INSERT INTO "public"."methods"("type", "description")
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING;`;

  const values = [
    method.type, //
    method.description,
  ];

  await (client || pool).query({ text, values });

  return method;
};
