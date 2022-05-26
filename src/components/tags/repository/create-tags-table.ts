export { createTagsTable };

const createTagsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."tags" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "geneId"          varchar(50) NULL,
      "proteinId"       varchar(50) NULL,
      "name"            text NOT NULL,
      CONSTRAINT        "fkgenes" FOREIGN KEY ( "geneId" ) REFERENCES "public"."genes" ( "accession" ),
      CONSTRAINT        "fkproteins" FOREIGN KEY ( "proteinId" ) REFERENCES "public"."proteins" ( "accession" )
    );

    CREATE INDEX IF NOT EXISTS tags_lower_case_name ON "public"."tags" (lower("name"));
  `;
};
