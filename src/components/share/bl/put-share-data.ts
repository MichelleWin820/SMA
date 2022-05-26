import { ShareRecord } from '../models.js';
import { insertShareRecord } from '../repository/insert-share-record.js';

export { putShareData };

const putShareData = async (value: any): Promise<ShareRecord> => {
  const share = await insertShareRecord(JSON.stringify(value));
  return share;
};
