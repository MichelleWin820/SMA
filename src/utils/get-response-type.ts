import { Request } from 'koa';

export { getResponseType };

const getResponseType = (request: Request, defaultType: 'json' | 'html' = 'json'): string => {
  if (defaultType in request.query) {
    return defaultType;
  }

  const accept = request.accepts(defaultType, 'html');
  return typeof accept === 'string' ? accept : defaultType;
};
