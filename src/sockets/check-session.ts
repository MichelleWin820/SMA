import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { SESSION_REQUIRED } from '../components/auth/errors.js';
import { verifyToken } from '../components/auth/utils/verify-token.js';
import { appConfig } from '../config/index.js';
import { AppError } from '../errors/app-error.js';
import { APP_UNAUTHORIZED_REQUEST } from '../errors/common-errors.js';
import { parseCookies } from '../utils/parse-cookies.js';

export { checkSession, allowRequest };

type SocketNext = (err?: ExtendedError) => void;
type SocketMiddleware = (socket: Socket, next: SocketNext) => void;
type AllowRequestCallback = (err: string | null | undefined, success: boolean) => void;

const checkSession: SocketMiddleware = async (socket: Socket, next: SocketNext): Promise<void> => {
  const cookies = parseCookies(socket.request?.headers?.cookie || '');
  const token = cookies[appConfig.auth.cookieName];

  if (!token) {
    return next(new AppError(SESSION_REQUIRED));
  }

  try {
    const user = await verifyToken(token);
    socket.data = { ...socket.data, user };
    return next();
  } catch (error) {
    return next(new AppError(APP_UNAUTHORIZED_REQUEST));
  }
};

const allowRequest = async (req: IncomingMessage, callback: AllowRequestCallback): Promise<void> => {
  const cookies = parseCookies(req.headers?.cookie || '');
  const token = cookies[appConfig.auth.cookieName];

  if (!token) {
    return callback(SESSION_REQUIRED.message, false);
  }

  try {
    await verifyToken(token);
    return callback(void 0, true);
  } catch (error) {
    return callback(error?.message, false);
  }
};
