/**  For global type declarations (e.g., Window interface extension, module augmentation).
/* As a single place to re-export types from other files (user.ts, thread.ts, etc.) for cleaner imports.
/* Defining global variables, env variables, or augmenting libraries.*/
declare global {
  interface Window {
    __INITIAL_STATE__: {
      auth: AuthState,
      inputForm: UiState
    };
  }
}
export * from './api';
export * from './state';
export * from './thread';

