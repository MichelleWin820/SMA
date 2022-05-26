export { createRxnPrnPwyTable };

const createRxnPrnPwyTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."rxnprnpwy" (
      "id"               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "reactionId"       varchar(50) NOT NULL,
      "proteinId"        varchar(50) NULL,
      "pathwayId"        varchar(50) NULL,
      FOREIGN KEY ("pathwayId")   REFERENCES  "public"."pathways" ( "id" ),
      FOREIGN KEY ("reactionId")  REFERENCES  "public"."reactions" ( "id" ),
      FOREIGN KEY ("proteinId")   REFERENCES  "public"."proteins" ( "accession" )
    );
  `;
};
