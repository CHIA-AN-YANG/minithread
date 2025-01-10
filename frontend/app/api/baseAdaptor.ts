import axios, { AxiosResponse, AxiosError } from 'axios';
import { token, apiBaseUrl, csrfToken } from './util';

export const authConfig = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    'X-XSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
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
  const config = token ? authConfig : noAuthConfig;
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
  return await axios.get(apiBaseUrl + url, authConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPost = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.post(apiBaseUrl + url, inputData, authConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPut = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.put(apiBaseUrl + url, inputData, authConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedDelete = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  return await axios.delete(apiBaseUrl + url, authConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}