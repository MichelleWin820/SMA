import { StringAnyMap } from 'src/app/core/typings/common';

export { indexBy, omitEmptyProps, isDefined };

const indexBy = <T extends StringAnyMap>(arr: readonly T[], key: keyof T) => {
  return arr.reduce((map, item) => {
    map.set(item[key], item);
    return map;
  }, new Map<string, T>());
};

const omitEmptyProps = <T extends StringAnyMap>(object: T | undefined): T => {
  if (typeof object !== 'object' || object === null) return {} as T;

  return Object.keys(object).reduce((acc, key) => {
    if (isDefined(object[key])) {
      (acc as any)[key] = object[key];
    }
    return acc;
  }, {} as T);
};

const isDefined = (val: any) => {
  return val !== null && val !== void 0;
};
