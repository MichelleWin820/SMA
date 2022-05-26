import { StringAnyMap } from '../typings/index.js';

export function uriEncodeObject(obj: StringAnyMap) {
  const formData = Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const encodeKey = encodeURIComponent(key);
    if (Array.isArray(value)) {
      acc.push(...value.map((v) => `${encodeKey}=${encodeURIComponent(v)}`));
    } else {
      acc.push(`${encodeKey}=${encodeURIComponent(value)}`);
    }
    return acc;
  }, [] as string[]);

  return formData.join('&');
}
