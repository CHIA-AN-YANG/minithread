import axios, { AxiosResponse, AxiosError } from 'axios';
import { apiBaseUrl, csrfToken, token } from './util';
const Cookies = require('js-cookie');
const AUTH_COOKIE = 'auth_token';
const CSRF_COOKIE = 'csrf_token';

export const authConfig = () => {
  return {
    headers: {
      'Authorization': `Bearer ${Cookies.get(AUTH_COOKIE)}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'X-XSRF-TOKEN': `${Cookies.get(CSRF_COOKIE)}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }
};
export const noAuthConfig = () => {
  return {
    headers: {
      'Cache-Control': 'no-cache, must-revalidate',
      'X-XSRF-TOKEN': `${Cookies.get(CSRF_COOKIE)}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }
};

export const get = async <T>(url: string): Promise<AxiosResponse<T> | AxiosError> => {
  const config = Cookies.get(AUTH_COOKIE) ? authConfig() : noAuthConfig();
  return await axios.get(apiBaseUrl + url, config).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const post = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.post(apiBaseUrl + url, inputData, noAuthConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedGet = async <T>(url: string): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.get(apiBaseUrl + url, authConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPost = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.post(apiBaseUrl + url, inputData, authConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPut = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.putForm(apiBaseUrl + url, inputData, authConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedDelete = async <T>(url: string, inputData?: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.delete(apiBaseUrl + url, authConfig()).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}