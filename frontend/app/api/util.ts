let apiUrl: string;
if (process.env.NEXT_PUBLIC_API_PORT == undefined || process.env.NEXT_PUBLIC_API_PORT == 'undefined') {
  apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
} else {
  apiUrl = process.env.NEXT_PUBLIC_API_URL + ":" + process.env.NEXT_PUBLIC_API_PORT;
}

export const getApiUrl = (): string => {
  return apiUrl;
}