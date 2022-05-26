import { DbClient } from '../../../db/sql-storage/models.js';
import { createLocalizationTable } from './create-localization-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createLocalizationTable() });
  await migrate(client);
};
