import { AuthUser } from 'src/app/core/typings/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  readonly user?: AuthUser;
}
