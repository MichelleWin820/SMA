import Koa from 'koa';
import koaBody from 'koa-body';
import { appConfig, createAppConfig } from './config/index.js';
import { errorBodyParseHandler, errorHandler } from './errors/error-handler.js';
import { logError } from './errors/log-error.js';
import { createAppLogger } from './log/index.js';
import { api } from './routes/api.js';
import { client, fallback } from './routes/client.js';

export { createApp };

const createApp = (): Koa<Koa.DefaultState, Koa.DefaultContext> => {
  createAppConfig();
  createAppLogger();

  const app: Koa = new Koa();

  // error handling
  app.use(errorHandler());

  // body parser
  app.use(
    koaBody({
      multipart: true,
      formidable: appConfig.upload,
      onError: errorBodyParseHandler(),
    }),
  );

  // routes
  app.use(api.routes());
  app.use(api.allowedMethods());

  // client
  app.use(client());
  app.use(fallback());

  // error logging
  app.on('error', logError);

  return app;
};
