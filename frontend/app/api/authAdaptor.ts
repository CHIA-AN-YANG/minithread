import axios, { AxiosError } from 'axios';
import { AuthResponse, UserResponse } from '../model/model';
import crypto from 'crypto';

let apiUrl: string;
if (process.env.NEXT_PUBLIC_API_PORT == undefined || process.env.NEXT_PUBLIC_API_PORT == 'undefined') {
  apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
} else {
  apiUrl = process.env.NEXT_PUBLIC_API_URL + ":" + process.env.NEXT_PUBLIC_API_PORT;
}

export const postAuthToken = async (formData: FormData): Promise<AuthResponse | AxiosError> => {

  const username = formData.get('email') as string;
  const password = formData.get('password') as string;
  const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

  // return await axios.post(apiUrl + '/api/auth/token', {}, {
  //   headers: {
  //     'Authorization': basicAuth,
  //     'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  //     'Access-Control-Allow-Origin': '*',
  //   }
  // }).catch((error) => {
  //   return error
  // });
  //}

  return await axios.get(apiUrl + '/api/post/1', {
    headers: {

      'Access-Control-Allow-Origin': '*',
    }
  }).catch((error) => {
    return error
  });

}

export const getVerifiedUser = async (token: string): Promise<UserResponse | AxiosError> => {
  return await axios.get(apiUrl + '/api/user/detail', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
    return error
  });
}

async function hashCode(plainCode: string) {
  return crypto.createHash('sha256').update(plainCode).digest('hex');
}

