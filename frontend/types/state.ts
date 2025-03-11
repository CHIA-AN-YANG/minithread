// for the state of redux store

import { UserData } from './api';

export interface UiState {
  inputForm: string;
  parent: string | null;
  content: string;
  status: ContentStatus;
}

export interface AuthState {
  user: UserData | null;
  error: string | null;
  loading: boolean;
  status: EntityStatus;
}
export type EntityState<T> = {
  value: T | null;
  status: EntityStatus;
  error: string | null;
}

export enum EntityStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  IDLE = 'idle'
}

export enum ContentStatus {
  LOADING = 'loading',
  SENT = 'sent',
  DELETED = 'deleted',
  ERROR = 'error',
  IDLE = 'idle'
}

