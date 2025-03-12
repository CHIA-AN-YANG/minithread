export interface Pagination<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

export interface AuthData {
  valid: boolean,
  token?: string,
  message?: string
}

export interface UserData {
  username: string;
  email: string;
  name?: string;
  profilePicture?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
  followers?: string[];
  followed?: string[];
}

export interface ThreadData {
  id: string;
  author: UserData;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  parentThread?: string;
  comments?: ThreadData[];
  commentsCount?: number;
  likedBy?: string[];
  likedByMe?: boolean;
  likedByCount?: number;
}