import axios, { AxiosResponse, AxiosError } from 'axios';
import { apiBaseUrl, csrfToken, token } from './util';
const Cookies = require('js-cookie');
const TOKEN_COOKIE = 'auth_token';

export const getAuthConfig = () => {
  return {
    headers: {
      'Authorization': `Bearer ${Cookies.get(TOKEN_COOKIE)}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'X-XSRF-TOKEN': csrfToken,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }
};
export const noAuthConfig = {
  headers: {
    'Cache-Control': 'no-cache, must-revalidate',
    'X-XSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
};

export const get = async <T>(url: string): Promise<AxiosResponse<T> | AxiosError> => {
  const config = Cookies.get(TOKEN_COOKIE) ? getAuthConfig() : noAuthConfig;
  return await axios.get(apiBaseUrl + url, config).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const post = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.post(apiBaseUrl + url, inputData, noAuthConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedGet = async <T>(url: string): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.get(apiBaseUrl + url, getAuthConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPost = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.post(apiBaseUrl + url, inputData, getAuthConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPut = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.putForm(apiBaseUrl + url, inputData, getAuthConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedDelete = async <T>(url: string, inputData?: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.delete(apiBaseUrl + url, getAuthConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}