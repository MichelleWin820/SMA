import {
  APP_ACCESS_DENIED,
  APP_INVALID_REQ_MODEL,
  APP_NOT_IMPLEMENTED,
  APP_RESOURCE_NOT_FOUND,
  APP_RUNTIME_ERROR
} from './common-errors.js';

export type IAppError = {
  message: string;
  code?: string;
  status?: number;
  expose?: boolean;
  name?: string;
  desctiption?: string;
  details?: unknown;
  stack?: string;
};

export class AppError extends Error implements IAppError {
  public readonly message: string;
  public readonly code?: string;
  public readonly status?: number;
  public readonly expose?: boolean;
  public readonly stack?: string;
  public readonly details?: unknown;
  public readonly desctiption?: string;

  constructor({ message, code, status, expose, details, desctiption }: IAppError) {
    super();

    Object.defineProperty(this, 'name', { value: new.target.name });
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);

    this.code = code;
    this.status = status;
    this.message = message;
    this.details = details;
    this.desctiption = desctiption;

    if (typeof expose === 'boolean') {
      this.expose = expose;
    } else if (typeof status === 'number') {
      this.expose = status < 500;
    }
  }
}

export class AppBadRequest extends AppError {
  constructor(message: string, status = APP_INVALID_REQ_MODEL.status) {
    super({ message, status, code: APP_INVALID_REQ_MODEL.code, expose: true });
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AppNotImplemented extends AppError {
  constructor(message = APP_NOT_IMPLEMENTED.message, status = APP_NOT_IMPLEMENTED.status) {
    super({ message, status, code: APP_NOT_IMPLEMENTED.code, expose: true });
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AppNotFoundError extends AppError {
  constructor(message: string, status = APP_RESOURCE_NOT_FOUND.status) {
    super({ message, status, code: APP_RESOURCE_NOT_FOUND.code, expose: true });
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AppAccessDeniedError extends AppError {
  constructor(message: string, status = APP_ACCESS_DENIED.status) {
    super({ message, status, code: APP_ACCESS_DENIED.code, expose: true });
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AppRuntimeError extends AppError {
  constructor(message: string, status = APP_RUNTIME_ERROR.status) {
    super({ message, status, code: APP_RUNTIME_ERROR.code, expose: true });
    Error.captureStackTrace(this, this.constructor);
  }
}
