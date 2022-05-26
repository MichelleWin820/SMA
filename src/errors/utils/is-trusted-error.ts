const isTrustedError = (error: any): boolean => {
  return error?.expose === true;
};

export { isTrustedError };
