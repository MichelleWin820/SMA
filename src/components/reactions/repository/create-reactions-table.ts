export { createReactionsTable };

const createReactionsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."reactions" (
      "id"          varchar(50) NOT NULL PRIMARY KEY,
      "name"        text NOT NULL,
      "ecNumber"    varchar(50) NULL,
      "metaDomain"  varchar(255) NULL
    );
  `;
};
