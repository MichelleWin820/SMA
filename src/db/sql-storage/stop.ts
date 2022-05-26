import { pool } from './pool.js';

export { stop };

const stop = async (): Promise<void> => {
  return pool.end();
};
