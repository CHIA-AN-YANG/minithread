import axios, { AxiosError, AxiosResponse } from 'axios';
import { Pagination, PostData } from '../model/model';
import { getApiUrl } from './util';
const Cookies = require('js-cookie');
const TOKEN_COOKIE = 'auth_token';

const apiUrl = getApiUrl();
const token = Cookies.get(TOKEN_COOKIE);

export const getPost = async (postId: string): Promise<PostData | AxiosError> => {
  return await axios.get(apiUrl + '/api/posts/' + postId, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Cache-Control': 'no-cache, must-revalidate',
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
    return error
  });
}

export const postPost = async (content: string): Promise<AxiosResponse<PostData> | AxiosError> => {
  return await axios.post(apiUrl + '/api/posts', { author: "test-user_001", content }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Cache-Control': 'no-cache, must-revalidate',
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
    return error
  });
}

export const getAuthorPostList = async (author: string, page?: number): Promise<AxiosResponse<Pagination<PostData>> | AxiosError> => {
  let url = apiUrl + '/api/posts/by-author/' + author;
  if (page !== undefined) {
    url += `?page=${page}`;
  }

  return await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Cache-Control': 'no-cache, must-revalidate',
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}