import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/core/auth/store/state';
import * as actions from './actions';

export { authReducer };

const reducer = createReducer<AuthState>(
  {},

  on(actions.signinSuccess, actions.checkTokenSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
);

const authReducer = (state: AuthState, action: Action): AuthState => {
  return reducer(state, action);
};
