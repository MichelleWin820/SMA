export { createDomainsTable };

const createDomainsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."domains" (
      "id"              varchar(50) PRIMARY KEY,
      "name"            varchar(255) NULL,
      "proteinId"       varchar(50) NULL,
      CONSTRAINT        "fkproteins" FOREIGN KEY ( "proteinId" ) REFERENCES "public"."proteins" ( "accession" ) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS domains_lower_case_name ON "public"."domains" (lower("name"));
  `;
};
