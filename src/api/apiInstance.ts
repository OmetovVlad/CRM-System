import axios from 'axios';
import { tokenManager } from '../utils/TokenManager.ts';

const BASE_URL = 'https://easydev.club/api/v1';
let refreshingToken: Promise<string> | null = null;

export const apiInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiInstance.interceptors.request.use((request) => {
  const token = tokenManager.getToken();

  if (token) {
    request.headers.Authorization = `Bearer ${tokenManager.getToken()}`;
  }

  return request;
});

apiInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/signin')
    ) {
      originalRequest._retry = true;

      if (!refreshingToken) {
        const refreshToken = localStorage.getItem('refreshToken');
        refreshingToken = apiInstance.post('/auth/refresh', { refreshToken })
          .then(({ data }) => {
            tokenManager.setToken(data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            apiInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
            return data.accessToken;
          })
          .catch(err => {
            tokenManager.clearToken();
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
            throw err;
          })
          .finally(() => { refreshingToken = null; });
      }

      const newToken = await refreshingToken;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

