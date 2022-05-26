import { DbClient } from '../../../db/sql-storage/models.js';
import { createTagsTable } from './create-tags-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createTagsTable() });
  await migrate(client);
};
