import { DbClient } from '../../../db/sql-storage/models.js';
import { createProteinsTable } from './create-proteins-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createProteinsTable() });
  await migrate(client);
};
