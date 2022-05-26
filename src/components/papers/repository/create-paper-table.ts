export { createPaperTable };

const createPaperTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."papers" (
      "id"              varchar(50) PRIMARY KEY,
      "title"           text NULL,
      "journal"         text NULL,
      "pages"           varchar(30) NULL,
      "issn"            varchar(30) NULL,
      "essn"            varchar(30) NULL,
      "volume"          int NULL,
      "issue"           int NULL,
      "pubDate"         date NULL
    );

    CREATE INDEX IF NOT EXISTS papers_lower_case_title ON "public"."papers" (lower("title"));
    CREATE INDEX IF NOT EXISTS papers_lower_case_journal ON "public"."papers" (lower("journal"));
    CREATE INDEX IF NOT EXISTS papers_issn ON "public"."papers" ("issn");
    CREATE INDEX IF NOT EXISTS papers_pub_date ON "public"."papers" ("pubDate");
  `;
};
