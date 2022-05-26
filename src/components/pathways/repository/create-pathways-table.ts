export { createPathwaysTable };

const createPathwaysTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."pathways" (
      "id"          varchar(50) NOT NULL PRIMARY KEY,
      "name"        text NOT NULL
    );
  `;
};
