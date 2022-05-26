export { createGenesTable };

const createGenesTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."genes" (
      "accession"       varchar(50) NOT NULL PRIMARY KEY,
      "name"            varchar(255) NULL,
      "symbol"          varchar(50) NULL
    );

    CREATE INDEX IF NOT EXISTS genes_lower_case_name ON "public"."genes" (lower("name"));
    CREATE INDEX IF NOT EXISTS symbol_lower_case_name ON "public"."genes" (lower("symbol"));
  `;
};
