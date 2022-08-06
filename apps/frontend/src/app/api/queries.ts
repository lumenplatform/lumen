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
  return client.get<any>('/asset/upload-config').then((r) => r.data.data);
}

export function uploadContent(data: any) {
  return client.post('/asset', data);
}

export const fetchUsers = () => client.get('/auth/users');

export function search(params: any) {
  return client
    .get<any>('/courses/', { params: params })
    .then((r) => r.data.data);
}

export function getCourseById(id: string) {
  return client.get<any>(`/courses/${id}`).then((r) => r.data.data);
}

export function getCourseMaterial(id: string) {
  return client.get<any>(`/courses/${id}/material`).then((r) => r.data.data);
}

// MANAGEMENT ENDPOINTS

export function createNewCourse(data: any) {
  return client.post('/manage/courses', data, {});
}

export function updateCourse(data: any) {
  return client
    .put('/manage/courses/' + data.courseId, data, {})
    .then((r) => r.data.data);
}

export function getOrgCourses() {
  return client.get<any>('/manage/courses/', {}).then((r) => r.data.data);
}

export function getOrgCoursesById(id: string) {
  return client.get<any>('/manage/courses/' + id, {}).then((r) => r.data.data);
}

// END MANAGEMENT
