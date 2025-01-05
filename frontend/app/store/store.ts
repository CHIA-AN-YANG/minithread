import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import { AuthState, UiState } from '../model/model';
import rootReducer from './features/user/reducers/rootReducer';

declare global {
  interface Window {
    __INITIAL_STATE__: {
      auth: AuthState,
      inputForm: UiState
    };
  }
}

export const store = configureStore({
  reducer: rootReducer,
  //preloadedState: typeof window !== 'undefined' ? window.__INITIAL_STATE__ as { auth: AuthState, inputForm: UiState } : {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;