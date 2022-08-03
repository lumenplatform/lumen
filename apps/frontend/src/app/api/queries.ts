import axios, { AxiosRequestConfig } from 'axios';

const getToken = () => localStorage.getItem('token');

const client = axios.create({
  baseURL: '/api/',
  timeout: 10000,
});

client.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!['Authorization'] = token;
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
  return client.get<any>('/asset/upload-config').then((r) => r.data.data);
}

export function uploadContent(data: any) {
  return client.post('/asset', data);
}

export const fetchUsers = () => client.get('/auth/users');

export function createNewCourse(data: any) {
  return client.post('/manage/courses', data, {});
}

export function search(params: any) {
  return client
    .get<any>('/courses/', { params: params })
    .then((r) => r.data.data);
}

export function getCourseById(id: string) {
  return client.get<any>(`/courses/${id}`).then((r) => r.data.data);
}
