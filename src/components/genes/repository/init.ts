import { DbClient } from '../../../db/sql-storage/models.js';
import { createGenesTable } from './create-genes-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createGenesTable() });
  await migrate(client);
};
