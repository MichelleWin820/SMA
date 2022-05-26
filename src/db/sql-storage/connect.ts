import { PoolClient } from 'pg';
import { pool } from './pool.js';

export { connect };

const connect = async (): Promise<PoolClient> => {
  return pool.connect();
};
