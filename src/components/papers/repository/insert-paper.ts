import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Paper } from '../models.js';

export { insertPaper };

const insertPaper = async (paper: Paper, client?: DbClient): Promise<Paper> => {
  const text = `INSERT INTO "public"."papers"(
                                              "id",
                                              "title",
                                              "journal",
                                              "pages",
                                              "issn",
                                              "essn",
                                              "volume",
                                              "issue",
                                              "pubDate"
                                              )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT ("id")
                DO UPDATE SET "title"      = excluded."title",
                              "journal"    = excluded."journal",
                              "pages"      = excluded."pages",
                              "issn"       = excluded."issn",
                              "essn"       = excluded."essn",
                              "volume"     = excluded."volume",
                              "issue"      = excluded."issue",
                              "pubDate"    = excluded."pubDate";`;

  const values = [
    paper.id, //
    paper.title,
    paper.journal,
    paper.pages,
    paper.issn,
    paper.essn,
    paper.volume,
    paper.issue,
    paper.pubDate,
  ];

  await (client || pool).query({ text, values });

  return paper;
};
