import { LogMessage, Payload } from 'src/app/import/typings/upload';

export { formatLogMessage };

const formatLogMessage = ({ error, row, idx, msg }: Payload): LogMessage => {
  const rs = idx !== void 0 ? `Row ${idx}` : '';
  const id = idx || Math.random();

  if (error) {
    const m = msg || error.message || error.code || '';
    const err = m ? `Error: ${m}` : '';
    const data = row ? `Data: ${JSON.stringify(row)}` : '';
    const message = [rs, err, data].filter((s) => !!s).join('; ');
    return { id, error: true, message };
  }

  if (msg) {
    return { id, error: false, message: msg };
  }

  if (row) {
    const m = `Success: ${JSON.stringify(row)}`;
    const message = [rs, m].filter((s) => !!s).join('; ');
    return { id, error: false, message };
  }

  return { id, error: false, message: 'Success' };
};
