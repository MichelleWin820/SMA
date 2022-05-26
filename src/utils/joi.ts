import joi from 'joi';
import { AppError } from '../errors/app-error.js';
import { APP_INVALID_REQ_MODEL } from '../errors/common-errors.js';

export { verifySchema };

const verifySchema = async <T>(schema: joi.Schema, rawValue: unknown): Promise<T> => {
  try {
    return await schema.validateAsync(rawValue);
  } catch (error) {
    throw new AppError({
      ...APP_INVALID_REQ_MODEL,
      details: error.details,
      message: error.message,
    });
  }
};
