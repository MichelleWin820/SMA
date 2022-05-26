import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from 'src/app/core/typings/common';

export { parseHttpError };

const parseHttpError = (res: HttpErrorResponse) => {
  const {
    name, //
    stack,
    status = res.status,
    code = res.status + '',
    message = res.message || res.statusText,
  } = res.error?.error || {};

  const result: AppError = { message, status, code, stack, name };
  return result;
};
