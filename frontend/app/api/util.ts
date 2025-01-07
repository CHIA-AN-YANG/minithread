const Cookies = require('js-cookie');
const TOKEN_COOKIE = 'auth_token';
export const token = Cookies.get(TOKEN_COOKIE);

let apiUrl: string;
if (process.env.NEXT_PUBLIC_API_PORT == undefined || process.env.NEXT_PUBLIC_API_PORT == 'undefined') {
  apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
} else {
  apiUrl = process.env.NEXT_PUBLIC_API_URL + ":" + process.env.NEXT_PUBLIC_API_PORT;
}

export const apiBaseUrl = apiUrl + "/api";