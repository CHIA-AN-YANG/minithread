import axios from 'axios';
const Cookies = require('js-cookie');
const AUTH_COOKIE = 'auth_token';
const CSRF_COOKIE = 'csrf_token';


let apiUrl: string;
if (process.env.NEXT_PUBLIC_API_PORT == undefined || process.env.NEXT_PUBLIC_API_PORT == 'undefined') {
  apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
} else {
  apiUrl = process.env.NEXT_PUBLIC_API_URL + ":" + process.env.NEXT_PUBLIC_API_PORT;
}

function getCsrfTokenFromCookie() {
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

export const apiBaseUrl = apiUrl + "/api";
export const csrfToken = Cookies.get(CSRF_COOKIE);
export const token = Cookies.get(AUTH_COOKIE);