import axios, { AxiosResponse, AxiosError } from 'axios';
import { apiBaseUrl, getConfig } from './util';
const Cookies = require('js-cookie');

export const get = async <T>(url: string): Promise<AxiosResponse<T> | AxiosError> => {
  const authedConfig = await getConfig(Cookies.get('auth_token') ? true : false);
  return await axios.get(apiBaseUrl + url, authedConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const post = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  const authedConfig = await getConfig(false);
  return await axios.post(apiBaseUrl + url, inputData, authedConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedGet = async <T>(url: string): Promise<AxiosResponse<T> | AxiosError> => {
  const authedConfig = await getConfig(true);
  return await axios.get(apiBaseUrl + url, authedConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPost = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  const authedConfig = await getConfig(true);
  return await axios.post(apiBaseUrl + url, inputData, authedConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedPut = async <T>(url: string, inputData: Object): Promise<AxiosResponse<T> | AxiosError> => {
  const authedConfig = await getConfig(true);
  return await axios.putForm(apiBaseUrl + url, inputData, authedConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}

export const authedDelete = async <T>(url: string, inputData?: Object): Promise<AxiosResponse<T> | AxiosError> => {
  const authedConfig = await getConfig(true);
  return await axios.delete(apiBaseUrl + url, authedConfig).then((response) => {
    return response;
  }
  ).catch((error) => {
    return error;
  });
}