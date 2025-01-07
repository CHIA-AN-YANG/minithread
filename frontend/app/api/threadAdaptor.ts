import { AxiosError, AxiosResponse } from 'axios';
import { Pagination, ThreadData } from '../model/model';
import { authedGet, authedPost, get } from './baseAdaptor';


export const getThread = async (postthreadId: string): Promise<AxiosResponse<ThreadData> | AxiosError> => {
  return await authedGet<ThreadData>(`/threads/${postthreadId}`);
}

export const postThread = async (inputData: { content: string, parent?: string }): Promise<AxiosResponse<ThreadData> | AxiosError> => {
  return await authedPost<ThreadData>('/threads', inputData);
}

export const getAuthorThreadList = async (author: string, page?: number): Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError> => {
  let url = `/threads/by-author/${author}`;
  page && (url += `?page=${page}`);
  return await get<Pagination<ThreadData>>(url);
}

export const getAuthorCommentsList = async (page?: number): Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError> => {
  let url = '/me/comments';
  page && (url += `?page=${page}`);
  return await authedGet<Pagination<ThreadData>>(url);
}

export const getLatestThreadList = async (page?: number): Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError> => {
  let url = '/threads/latest';
  page && (url += `?page=${page}`);
  return await get<Pagination<ThreadData>>(url);
}
