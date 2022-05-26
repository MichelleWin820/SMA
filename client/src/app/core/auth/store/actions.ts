import { createAction, props } from '@ngrx/store';
import { AuthUser, SingInReq } from 'src/app/core/typings/auth';
import { AppError } from 'src/app/core/typings/common';

export const signin = createAction('[Auth] signin', props<{ req: SingInReq }>());
export const signinError = createAction('[Auth] signin error', props<{ error: AppError }>());
export const signinSuccess = createAction('[Auth] signin success', props<{ user: AuthUser }>());

export const checkToken = createAction('[Auth] check token');
export const checkTokenError = createAction('[Auth] check token error', props<{ error: AppError }>());
export const checkTokenSuccess = createAction('[Auth] check token success', props<{ user: AuthUser }>());
