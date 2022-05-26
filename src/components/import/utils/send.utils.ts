import { sendToSocket } from '../../../sockets/index.js';
import { User } from '../../auth/models.js';
import { IMPORT_COMPLETE, IMPORT_PROGRESS, IMPORT_START, Payload } from '../models.js';

export { sendImportStart, sendImportProgress, sendImportComplete };

const sendImportStart = (token: string, creator: User, payload?: Partial<Payload>) => {
  sendToSocket(creator.email, { event: IMPORT_START, payload: { ...payload, token } });
};

const sendImportProgress = (token: string, creator: User, payload?: Partial<Payload>) => {
  sendToSocket(creator.email, { event: IMPORT_PROGRESS, payload: { ...payload, token } });
};

const sendImportComplete = (token: string, creator: User, payload?: Partial<Payload>) => {
  sendToSocket(creator.email, { event: IMPORT_COMPLETE, payload: { ...payload, token } });
};
