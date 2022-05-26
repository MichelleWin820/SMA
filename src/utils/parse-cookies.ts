import { StringStringMap } from '../typings/index.js';

export { parseCookies };

const parseCookies = (cookies: string): StringStringMap => {
  return cookies.split(';').reduce((acc, cookie) => {
    const [name, ...rest] = cookie.split('=');
    acc[name.trim()] = decodeURI(rest.join('='));
    return acc;
  }, {} as StringStringMap);
};
