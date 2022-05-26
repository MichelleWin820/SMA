import { DbClient } from '../../../db/sql-storage/models.js';
import { createPathwaysTable } from './create-pathways-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createPathwaysTable() });
  await migrate(client);
};
