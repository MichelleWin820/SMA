import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { appConfig } from '../../../config/index.js';
import { User } from '../models.js';

export { verifyToken };

const verifyPromise = promisify<string, jwt.Secret, jwt.VerifyOptions, User>(jwt.verify);
const verifyToken = async (token: string): Promise<User> => {
  return verifyPromise(token, appConfig.auth.tokenSign, {});
};
