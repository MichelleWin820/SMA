import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { appConfig } from '../../../config/index.js';
import { User } from '../models.js';

export { signToken, signPromise };

const signPromise = promisify<any, jwt.Secret, jwt.SignOptions, string>(jwt.sign);

const signToken = async (user: User): Promise<string> => {
  const { tokenSign, expiresIn } = appConfig.auth;
  return signPromise(user, tokenSign, { expiresIn });
};
