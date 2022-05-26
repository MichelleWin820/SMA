import * as http from 'http';
import { createApp } from './src/app.js';
import { appConfig } from './src/config/index.js';
import * as db from './src/db/index.js';
import { catchUncaughtException, catchUnhandledRejection } from './src/errors/index.js';
import { logger } from './src/log/index.js';
import { createSocketServer } from './src/sockets/index.js';

process.on('unhandledRejection', catchUnhandledRejection);
process.on('uncaughtException', catchUncaughtException);

const onAbortSignal = async (server: http.Server) => {
  try {
    await db.stop();
    server.close((e) => process.exit(e ? 1 : 0));
  } catch (error) {
    process.exit(1);
  }
};

const main = async () => {
  const app = createApp();

  logger.info(`Connect to databases...`);
  await db.init();

  logger.info(`Start web server...`);
  const port = appConfig.host.port;
  const httpServer = http.createServer(app.callback());
  await new Promise<void>((resolve) => httpServer.listen(port, resolve));

  logger.info(`Start listening web sockets...`);
  createSocketServer(httpServer);

  process.on('SIGINT', () => onAbortSignal(httpServer));

  logger.info(`Server started on port ${port} in ${appConfig.env} mode.`);
  return httpServer;
};

main();
