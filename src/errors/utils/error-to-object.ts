import { StringAnyMap } from '../../typings/index.js';

const errorToObject = (e: any): StringAnyMap => {
  if (typeof e !== 'object' || e === null) {
    return { message: e };
  }

  const keys = Object.getOwnPropertyNames(e);

  return keys.reduce((acc: StringAnyMap, key: string) => {
    acc[key] = e[key];
    return acc;
  }, {});
};

export { errorToObject };
