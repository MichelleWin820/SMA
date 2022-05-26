import { parseError } from '../../../errors/utils/parse-error.js';
import { ImportParams } from '../models.js';
import { sendImportComplete, sendImportProgress, sendImportStart } from '../utils/send.utils.js';

export { importItems, importRowByRow, sendImportStart, sendImportComplete };

const importItems = async <T>(params: ImportParams<T>): Promise<readonly T[]> => {
  const { token, creator } = params;

  try {
    sendImportStart(token, creator);
    return await importRowByRow(params);
  } finally {
    sendImportComplete(token, creator, { msg: 'Import complete.' });
  }
};

const importRowByRow = async <T>(params: ImportParams<T>): Promise<readonly T[]> => {
  const { token, creator, rows, createItem } = params;

  const items: T[] = [];
  const total = rows.length;
  for (let i = 0; i < total; i++) {
    const idx = i + 1;
    const row = rows[i];
    const progress = Math.round((i / total + Number.EPSILON) * 100);

    try {
      const item = await createItem(creator, row);
      items.push(item);
      sendImportProgress(token, creator, { idx, progress, row: item });
    } catch (err) {
      sendImportProgress(token, creator, { idx, progress, error: parseError(err) });
    }
  }

  return items;
};
