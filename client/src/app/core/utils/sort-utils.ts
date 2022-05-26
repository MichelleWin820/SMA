export { SortFn, getSortByString, getSortByDate, getSortByNumber, getSortFunction, compareStrings };

type SortFn = (a: any, b: any) => number;

const getSortByString = (key: string, revert = false, ignoreCase = false): SortFn => {
  const options: Intl.CollatorOptions = { sensitivity: ignoreCase === true ? 'base' : 'case' };

  return !revert //
    ? (a: any, b: any) => compareStrings(a[key], b[key], options)
    : (a: any, b: any) => compareStrings(b[key], a[key], options);
};

const getSortByDate = (key: string, revert = false): SortFn => {
  return !revert //
    ? (a: any, b: any) => a[key] - b[key]
    : (a: any, b: any) => b[key] - a[key];
};

const getSortByNumber = (key: string, revert = false): SortFn => {
  return !revert //
    ? (a: any, b: any) => a[key] - b[key]
    : (a: any, b: any) => b[key] - a[key];
};

const getSortFunction = (field: string, fieldType: string, revert = false, ignoreCase = false): SortFn => {
  return fieldType === 'string' //
    ? getSortByString(field, revert, ignoreCase)
    : getSortByNumber(field, revert);
};

const compareStrings = (a?: string, b?: string, options?: Intl.CollatorOptions): number => {
  if (!a) return -1;
  if (!b) return 1;
  return a.localeCompare(b, void 0, options);
};
