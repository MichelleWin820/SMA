export { createMethodsTable };

const createMethodsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."methods" (
      "type"                 varchar(20) NOT NULL PRIMARY KEY,
      "description"          text NULL
    );
  `;
};
