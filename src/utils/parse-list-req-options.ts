import { AppError } from '../errors/app-error.js';
import { APP_INVALID_REQ_MODEL } from '../errors/common-errors.js';
import { ListRequest, ParsedListRequest, StringAnyMap } from '../typings/index.js';

export { parseListReqOptions };

const parseListReqOptions = <T = StringAnyMap>(
  options?: ListRequest, //
  sortFileds: readonly (keyof T)[] = [],
  defaultLimit = 100,
): ParsedListRequest => {
  const { sort = '', skip = 0, limit = defaultLimit } = options || {};

  let orderDirection: 'ASC' | 'DESC' = 'ASC';
  let orderBy: string | undefined = sort;

  if (sort && sort[0] === '-') {
    orderBy = sort.slice(1);
    orderDirection = 'DESC';
  }

  if (!orderBy || !sortFileds.includes(orderBy as keyof T)) {
    orderBy = sortFileds[0] as string | undefined;
  }

  if (!orderBy) {
    throw new AppError({ ...APP_INVALID_REQ_MODEL, message: 'Invalid sort field.' });
  }

  return { sort, skip, limit, orderBy, orderDirection };
};
