import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from 'src/app/core/auth/store/state';

export const getSchemeStateSelector = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUserSelector = createSelector(getSchemeStateSelector, (state) => state.user);
