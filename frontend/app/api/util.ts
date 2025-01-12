import axios from 'axios';
import { get } from 'http';
const Cookies = require('js-cookie');
const AUTH_COOKIE = 'auth_token';
const CSRF_COOKIE = 'csrf_token';

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_PORT == undefined || process.env.NEXT_PUBLIC_API_PORT == 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
  } else {
    return process.env.NEXT_PUBLIC_API_URL + ":" + process.env.NEXT_PUBLIC_API_PORT;
  }
}

export const apiBaseUrl = getApiUrl() + "/api";

const getCsrfTokenFromCookie = () => {
  if (Cookies.get(CSRF_COOKIE)) {
    return;
  }
  return axios.get(apiBaseUrl + '/csrf-token').then((response) => {
    const csrfToken = response.data.token;
    Cookies.set('csrf_token', csrfToken);
  }).catch((error) => {
    console.error('Error getting CSRF token:', error);
  });
}

getCsrfTokenFromCookie();

export const csrfToken = Cookies.get(CSRF_COOKIE);
export const token = Cookies.get(AUTH_COOKIE);
export const getToken = () => Cookies.get(AUTH_COOKIE);
