import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Tag } from '../models.js';

export { insertTag };

const insertTag = async (tag: Tag, client?: DbClient): Promise<Tag> => {
  const text = `INSERT INTO "public"."tags"("name", "geneId", "proteinId")
                VALUES ($1, $2, $3)
                RETURNING *;`;

  const values = [
    tag.name, //
    tag.geneId,
    tag.proteinId,
  ];

  const res = await (client || pool).query({ text, values });

  return res.rows[0] as Tag;
};
