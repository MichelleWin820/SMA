import { AppRuntimeError } from '../../errors/app-error.js';
import { poolConfig } from './pool.js';
import { query } from './query.js';

export { clear };

const clear = async (): Promise<void> => {
  if (poolConfig.database !== 'test') {
    throw new AppRuntimeError('Clear allowed only on test database!');
  }
  return trancatePublicTables();
};

const trancatePublicTables = async () => {
  const text = `DROP SCHEMA IF EXISTS "public" CASCADE; CREATE SCHEMA IF NOT EXISTS "public";`;
  await query({ text });
};
