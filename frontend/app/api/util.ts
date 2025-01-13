import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { get } from 'http';
const Cookies = require('js-cookie');
const AUTH_COOKIE = 'auth_token';
export const CSRF_COOKIE = 'csrf_token';

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_PORT == undefined || process.env.NEXT_PUBLIC_API_PORT == 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
  } else {
    return process.env.NEXT_PUBLIC_API_URL + ":" + process.env.NEXT_PUBLIC_API_PORT;
  }
}

export const apiBaseUrl = getApiUrl() + "/api";

type CsrfResponse = {
  token: string;
  parametername: string;
  header: string;
}

async function initCsrfToken() {
  return axios.get<CsrfResponse>(apiBaseUrl + '/csrf-token');
}

export async function getConfig(auth: boolean): Promise<AxiosRequestConfig> {
  let csrfToken = Cookies.get(CSRF_COOKIE);

  if (!csrfToken) {
    const csrfResponse = await initCsrfToken();
    csrfToken = csrfResponse.data.token;
    Cookies.set(CSRF_COOKIE, csrfToken);
  }
  if (auth) {
    return {
      headers: {
        'Authorization': `Bearer ${Cookies.get(AUTH_COOKIE)}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'X-XSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json'
      }
    }
  } else {
    return {
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
        'X-XSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json'
      }
    }
  }
}
