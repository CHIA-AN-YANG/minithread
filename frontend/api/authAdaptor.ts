import { AuthData, UserData } from '@/types/api';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { authedDelete, authedGet, authedPost, get } from './baseAdaptor';
import { apiBaseUrl, getConfig } from './util';
export const CSRF_COOKIE = 'csrf_token';

export const postAuthToken = async (formData: FormData): Promise<AxiosResponse<AuthData> | AxiosError> => {

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

  return await axios.post(apiBaseUrl + '/auth/token', {}, {
    headers: {
      'Authorization': basicAuth,
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }).catch((error) => {
    return error
  });
}

export const getCommonUser = async (id: string): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await get<UserData>(`/user/${id}`);
}

export const registerUser = async (formData: FormData): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await axios.postForm<UserData>(apiBaseUrl + '/auth/register', formData, getConfig(false));
}

export const getMyProfile = async (): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await authedGet<UserData>('/me/detail');
}

export const getUserProfile = async (id: string): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await get<UserData>(`/user/${id}`);
}

export const updateMe = async (formData: FormData): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await axios.postForm(apiBaseUrl + '/me/update', formData, getConfig(true));
}

export const followUser = async (id: string): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await authedPost<UserData>(`/user/${id}/follow`, {});
}

export const unfollowUser = async (id: string): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await authedDelete<UserData>(`/user/${id}/unfollow`);
}


