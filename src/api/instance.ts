import axios from 'axios';
import { tokenManager } from '../utils/TokenManager.ts';

const BASE_URL = 'https://easydev.club/api/v1';

export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((request) => {
  const token = tokenManager.getToken();

  if (token) {
    request.headers.Authorization = `Bearer ${tokenManager.getToken()}`;
  }

  return request;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/signin')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const tokens = await instance.post('/auth/refresh', { refreshToken });

        tokenManager.setToken(tokens.data.accessToken);
        localStorage.setItem('refreshToken', tokens.data.refreshToken);

        instance.defaults.headers.Authorization = `Bearer ${tokens.data.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        tokenManager.clearToken();
        localStorage.removeItem('refreshToken');

        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
