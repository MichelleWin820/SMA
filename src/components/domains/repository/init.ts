import { DbClient } from '../../../db/sql-storage/models.js';
import { createDomainsTable } from './create-domains-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createDomainsTable() });
  await migrate(client);
};
