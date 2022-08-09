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
  return client.get<any>('/asset/upload-config').then((r) => r.data.data);
}

export function uploadContent(data: any) {
  return client.post('/asset', data);
}

export const fetchUsers = () => client.get('/auth/users');

export function getCourseById(id: string) {
  return client.get<any>(`/courses/${id}`).then((r) => r.data.data);
}

export function createNewQuiz(data: any) {
  return client.post(`/courses/${data.form.course}/quiz/`, data.form).then((r) => r.data.data);
}

export function updateQuiz( data: any) {
  return client.put(`/courses/${data.course}/quiz/${data.examId}`, data.form).then((r) => r.data.data);
}

export function getQuizById(courseId: string, examId: string) {
  return client.get<any>(`/courses/${courseId}/quiz/${examId}`).then((r) => r.data.data);
}