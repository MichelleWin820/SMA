import { Query, QueryResult } from './models.js';
import { pool } from './pool.js';

export { query };

const query = async (query: Query): Promise<QueryResult> => {
  return pool.query(query);
};
