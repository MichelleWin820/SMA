export { createLocalizationTable };

const createLocalizationTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."localization" (
      "proteinId"            varchar(50) NOT NULL,
      "organelleId"          varchar(50) NOT NULL,
      "pubMedId"             varchar(50) NOT NULL,
      "methodId"             varchar(20) NOT NULL,
      PRIMARY KEY            ("proteinId", "organelleId", "pubMedId", "methodId"),
      CONSTRAINT             "fkproteins" FOREIGN KEY ( "proteinId" ) REFERENCES "public"."proteins" ( "accession" ),
      CONSTRAINT             "fkmethods" FOREIGN KEY ( "methodId" ) REFERENCES "public"."methods" ( "type" ),
      CONSTRAINT             "fkpapers" FOREIGN KEY ( "pubMedId" ) REFERENCES "public"."papers" ( "id" )
    );
  `;
};
