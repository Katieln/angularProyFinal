

import { ActionReducerMap } from '@ngrx/store';
import { authFeatureKey, AuthState, authReducer } from './auth.reducer';

export interface RootState {
  [authFeatureKey]: AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  [authFeatureKey]: authReducer,
};
