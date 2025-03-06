import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../modules/dashboard/pages/users/models/users.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: User | null;
}

export const initialState: AuthState = {
  authUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, (state) => state),

  on(AuthActions.setAuthUser, (state, { user }) => ({
    ...state,
    authUser: user,
  })),

  on(AuthActions.unsetAuthUser, (state) => ({
    ...state,
    authUser: null,
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: authReducer, 
});