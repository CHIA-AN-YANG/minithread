import axios, { AxiosError } from 'axios';
import { PostData } from '../model/model';
import { getApiUrl } from './util';

const apiUrl = getApiUrl();

export const getPost = async (postId: string): Promise<PostData | AxiosError> => {
  return await axios.get(apiUrl + '/api/posts/' + postId, {
    headers: {
      'Cache-Control': 'no-cache, must-revalidate',
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
    return error
  });
}

const postPost = async (formData: FormData): Promise<PostData | AxiosError> => {
  return await axios.post(apiUrl + '/api/posts', formData, {
    headers: {
      'Cache-Control': 'no-cache, must-revalidate',
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
    return error
  });
}