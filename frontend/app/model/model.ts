export interface UserData {
  username: string;
  email: string;
  name?: string;
  profilePicture?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostData {
  id: string;
  author: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  parentPost?: string;
  comments?: PostData[];
  likesUser?: string[];
  likesCount?: number;
}

export interface Pagination<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

export interface AuthState {
  user: UserData | null;
  error: string | null;
  loading: boolean;
  status: EntityStatus;
}

export interface AuthData {
  valid: boolean,
  token?: string,
  message?: string
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

