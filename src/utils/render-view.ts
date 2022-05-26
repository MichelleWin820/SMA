import { Context } from 'koa';
import pug from 'pug';
import { StringAnyMap } from '../typings/index.js';

export { sendView, renderView, renderViewSync };

const sendView = (ctx: Context, view: string, status = 200): void => {
  ctx.type = 'html';
  ctx.status = status;
  ctx.length = Buffer.byteLength(view);

  ctx.res.end(view);
};

const renderView = (path: string, options: StringAnyMap): Promise<string> => {
  return new Promise((resolve, reject) => {
    pug.renderFile(path, options, (e, html) => {
      if (e) {
        return reject(e);
      }
      resolve(html);
    });
  });
};

const renderViewSync = (path: string, options: StringAnyMap): string => {
  return pug.renderFile(path, options);
};
