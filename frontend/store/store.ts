import { AuthState, UiState } from '@/types';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from './features/user/reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: typeof window !== 'undefined' ? window.__INITIAL_STATE__ as { auth: AuthState, inputForm: UiState } : {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;