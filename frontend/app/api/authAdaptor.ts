import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthData, UserData } from '../model/model';
import { apiBaseUrl } from './util';
import { post, authedGet, get, authedPost } from './baseAdaptor';
const Cookies = require('js-cookie');
const AUTH_COOKIE = 'auth_token';
export const CSRF_COOKIE = 'csrf_token';

export const postAuthToken = async (formData: FormData): Promise<AxiosResponse<AuthData> | AxiosError> => {

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

  return await axios.post(apiBaseUrl + '/auth/token', {}, {
    headers: {
      'Authorization': basicAuth,
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'X-XSRF-TOKEN': Cookies.get(CSRF_COOKIE),
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
  return await post<UserData>('/auth/register', formData);
}

export const getMyProfile = async (): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await authedGet<UserData>('/me/detail');
}

export const getUserProfile = async (id: string): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await get<UserData>(`/user/${id}`);
}

export const updateMe = async (formData: FormData): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await authedPost('/me/update', formData);
}


