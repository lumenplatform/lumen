import axios from 'axios';

const getToken = () => localStorage.getItem('lumen_token');

const client = axios.create({
  baseURL: '/api/',
  timeout: 10000,
});

client.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export function fetchUser() {
  return client.get<any>('/auth/me', {}).then((r) => r.data);
}

export function getUploadConfig() {
  return client.get<any>('/content/upload-config').then((r) => r.data.data);
}

export function uploadContent(data: any) {
  return client.post('/content', data);
}

export const fetchUsers = () => client.get('/auth/users');
