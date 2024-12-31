import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthData, UserData } from '../model/model';
import { getApiUrl } from './util';

const apiUrl = getApiUrl();
export const postAuthToken = async (formData: FormData): Promise<AxiosResponse<AuthData> | AxiosError> => {

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

  return await axios.post(apiUrl + '/api/auth/token', {}, {
    headers: {
      'Authorization': basicAuth,
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Access-Control-Allow-Origin': '*',
    }
  }).catch((error) => {
    return error
  });
}

export const registerUser = async (formData: FormData): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await axios.post(apiUrl + '/api/auth/register', formData).catch((error) => {
    return error
  });
}

export const getVerifiedUser = async (token: string): Promise<AxiosResponse<UserData> | AxiosError> => {
  return await axios.get(apiUrl + '/api/user/detail', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
    return error
  });
}


