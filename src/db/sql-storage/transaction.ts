import { DbClient } from './models.js';
import { pool } from './pool.js';

export { transaction };

const transaction = async <T>(transactionBodyFn: (client: DbClient) => Promise<T>): Promise<T> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const res = await transactionBodyFn(client);
    await client.query('COMMIT');
    return res;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};
