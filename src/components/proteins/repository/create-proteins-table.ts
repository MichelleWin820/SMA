export { createProteinsTable };

const createProteinsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."proteins" (
      "accession"       varchar(50) PRIMARY KEY,
      "uniProtId"       varchar(50) NOT NULL UNIQUE,
      "geneId"          varchar(50) NOT NULL,
      "name"            varchar(255) NULL,
      "description"     text NULL,
      "length"          integer NULL,
      "sequence"        text NULL,
      "species"         varchar(50) NULL,
      "isEnzyme"        boolean NULL,
      CONSTRAINT        "fkgenes" FOREIGN KEY ( "geneId" ) REFERENCES "public"."genes" ( "accession" ) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS proteins_lower_case_name ON "public"."proteins" (lower("name"));
    CREATE INDEX IF NOT EXISTS proteins_lower_case_description ON "public"."proteins" (lower("description"));
  `;
};
