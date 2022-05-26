import { AppNotFoundError } from '../../../errors/app-error.js';
import { safeParseJson } from '../../../utils/safe-json.js';
import { ShareRecord } from '../models.js';
import { getShareRecord } from '../repository/get-share-record.js';

export { getShareData };

const getShareData = async (id: string): Promise<any> => {
  const record = await getShareRecord(id);
  if (!record) throw new AppNotFoundError('');

  return safeParseJson<ShareRecord>(record.value);
};
