const only = <T>(src: T, keys: (keyof T)[]): T => {
  return keys.reduce((dest, key) => {
    dest[key] = src[key];
    return dest;
  }, {} as T);
};

export { only };
