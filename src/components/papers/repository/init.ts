import { DbClient } from '../../../db/sql-storage/models.js';
import { createPaperTable } from './create-paper-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createPaperTable() });
  await migrate(client);
};
