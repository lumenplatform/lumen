import axios, { AxiosRequestConfig } from 'axios';

const getToken = () => localStorage.getItem('token');

const client = axios.create({
  baseURL: '/api/',
  timeout: 10000,
});

client.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    // @ts-ignore
    config.headers['Authorization'] = token;
  }

  return config;
});

export function login() {
  return client.post<{ token: 'string' }>('/auth/login', {
    username: 'ee',
    password: 'ee®',
  });
}

export function getUploadConfig() {
  return client.get<any>('/content/upload-config').then((r) => r.data.data);
}

export function uploadContent(data: any) {
  return client.post('/content', data);
}

export const fetchUsers = () => client.get('/auth/users');
