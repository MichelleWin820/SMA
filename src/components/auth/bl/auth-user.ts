import { appConfig } from '../../../config/index.js';
import { AppBadRequest, AppNotImplemented } from '../../../errors/app-error.js';
import { SignInRes, User } from '../models.js';
import { signToken } from '../utils/sign-token.js';

export { authenticateUser };

const authenticateUser = async (email: string, password: string): Promise<SignInRes> => {
  if (appConfig.env === 'production') {
    throw new AppNotImplemented();
  }

  if (password !== appConfig.auth.masterpassword) {
    throw new AppBadRequest('Username or password is not valid');
  }

  const user: User = { email };
  const sid = await signToken(user);

  return { user, sid };
};
