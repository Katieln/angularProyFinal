import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectAuthUserEmail = createSelector(
  selectAuthState,
  (state) => state.authUser?.email
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.authUser
);