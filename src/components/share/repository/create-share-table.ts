export { createShareTable };

const createShareTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."share" (
      "id"               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "value"            text NOT NULL UNIQUE,
      "created"          timestamp with time zone NOT NULL DEFAULT (now() at time zone 'utc')
    );
  `;
};
