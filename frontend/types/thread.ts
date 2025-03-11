import { ThreadData, UserData } from './api';

export type ThreadProps = {
  id: string;
  content: string;
  author: UserData;
  createdAt: string;
  parentThread?: string;
  commentList?: ThreadData[];
  commentCount?: number;
  likedByCount?: number;
  likedByMe?: boolean;
};