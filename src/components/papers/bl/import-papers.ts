import { transaction } from '../../../db/sql-storage/transaction.js';
import { User } from '../../auth/models.js';
import { sendImportComplete, sendImportStart } from '../../import/bl/import-rows.js';
import { sendImportProgress } from '../../import/utils/send.utils.js';
import { Paper } from '../models.js';
import { getEmptyPapersIds } from '../repository/get-empty-papers.js';
import { insertPaper } from '../repository/insert-paper.js';
import { fetchFromNCBI } from './fetch-from-ncbi.js';

export { importPapers };

type Range = { from: number; to: number; progress: number };

const importPapers = async (token: string, creator: User): Promise<readonly Paper[]> => {
  sendImportStart(token, creator);
  const emptyPapers = await getEmptyPapersIds();

  let result: readonly Paper[] = [];
  if (emptyPapers.length === 0) {
    sendImportComplete(token, creator, { msg: `Papers without titles not found. Import complete.` });
    return result;
  }

  const batchSize = 20;
  const total = emptyPapers.length;
  for (let i = 0; i < total; i += batchSize) {
    const batch = emptyPapers.slice(i, i + batchSize);
    const progress = Math.round((i / total + Number.EPSILON) * 100);
    const range: Range = { from: i, to: i + batchSize, progress };

    const papers = await processBatch(token, creator, batch, range);
    result = [...result, ...papers];
  }

  sendImportComplete(token, creator, { msg: 'Import complete.' });
  return result;
};

const processBatch = async (token: string, creator: User, batch: readonly string[], range: Range): Promise<readonly Paper[]> => {
  const papers = await fetchBatch(token, creator, batch, range);
  if (papers.length === 0) return [];

  return insertBatch(token, creator, papers, range);
};

const fetchBatch = async (token: string, creator: User, batch: readonly string[], range: Range): Promise<readonly Paper[]> => {
  const { progress, from, to } = range;
  try {
    sendImportProgress(token, creator, { progress, msg: `Fetching ${from + 1}-${to} items from NCBI...` });
    return await fetchFromNCBI(batch);
  } catch (error) {
    sendImportProgress(token, creator, { progress, error });
  }

  return [];
};

const insertBatch = async (token: string, creator: User, papers: readonly Paper[], range: Range): Promise<readonly Paper[]> => {
  const { progress, from, to } = range;
  try {
    sendImportProgress(token, creator, { progress, msg: `Inserting ${from + 1}-${to} papers...` });
    return await transaction((client) => Promise.all(papers.map((p) => insertPaper(p, client))));
  } catch (error) {
    sendImportProgress(token, creator, { progress, error });
  }

  return [];
};
