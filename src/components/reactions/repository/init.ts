import { DbClient } from '../../../db/sql-storage/models.js';
import { createReactionsTable } from './create-reactions-table.js';
import { createRxnPrnPwyTable } from './create-rxnprnpwy-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createReactionsTable() });
  await client.query({ text: createRxnPrnPwyTable() });
  await migrate(client);
};
