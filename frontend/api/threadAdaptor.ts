/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Pagination, ThreadData } from '@/types/api';
import { AxiosError, AxiosResponse } from 'axios';
import { authedGet, authedPost, get } from './baseAdaptor';


export const getThread = async (threadId: string): Promise<AxiosResponse<ThreadData> | AxiosError> => {
  return await get<ThreadData>(`/threads/${threadId}`);
}

export const postThread = async (inputData: { content: string, parent?: string }): Promise<AxiosResponse<ThreadData> | AxiosError> => {
  return await authedPost<ThreadData>('/threads', inputData);
}

export const getUserThreadList = async (author: string, page?: number): Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError> => {
  let url = `/threads/by-author/${author}`;
  typeof (page) === 'number' && (url += `?page=${page}`);
  return await get<Pagination<ThreadData>>(url);
}

export const getAuthorThreadList = async (page?: number): Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError> => {
  let url = `/me/threads`;
  typeof (page) === 'number' && (url += `?page=${page}`);
  return await authedGet<Pagination<ThreadData>>(url);
}

export const getAuthorCommentsList = async (page?: number): Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError> => {
  let url = '/me/comments';
  typeof (page) === 'number' && (url += `?page=${page}`);
  return await authedGet<Pagination<ThreadData>>(url);
}

export const getLatestThreadList = async (page?: number): Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError> => {
  let url = '/threads/latest';
  typeof (page) === 'number' && (url += `?page=${page}`);
  return await get<Pagination<ThreadData>>(url);
}
