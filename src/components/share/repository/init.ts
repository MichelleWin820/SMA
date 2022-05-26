import { DbClient } from '../../../db/sql-storage/models.js';
import { createShareTable } from './create-share-table.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createShareTable() });
};
