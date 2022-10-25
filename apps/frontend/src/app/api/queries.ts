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

// AUTHENTICATION
export function fetchUser() {
  return client.get<any>('/auth/me').then((r) => r.data.data);
}

export function getPendingInvites() {
  return client.get<any>('/auth/invites').then((r) => r.data.data);
}

export function acceptInvite(id: string) {
  return client.post<any>('/auth/accept-invite/' + id).then((r) => r.data.data);
}

export function registerOrganization(data: any) {
  return client
    .post<any>('/auth/register-organization', data)
    .then((r) => r.data.data);
}
// END AUTHENTICATION

export function getUploadConfig() {
  return client.get<any>('/asset/upload-config').then((r) => r.data.data);
}

export function uploadContent(data: any) {
  return client.post('/asset', data);
}

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

export function getCourseReview(id: string) {
  return client.get<any>(`/courses/${id}/reviews`).then((r) => r.data.data);
}

export function getEnrolledCourses() {
  return client.get<any>('/courses/enrolled').then((r) => r.data.data);
}

export function getRecommendedCourses() {
  return client.get<any>('/courses/recommended').then((r) => r.data.data);
}

export function markTopicAsCompleted(courseId: string, topicId: string) {
  return client.post(`/courses/${courseId}/complete-topic/${topicId}`);
}

// MANAGEMENT
export function createNewCourse(data: any) {
  return client.post('/manage/courses', data, {});
}

export function updateCourse(data: any) {
  return client
    .put('/manage/courses/' + data.courseId, data, {})
    .then((r) => r.data.data);
}

export function getOrgCourses(searchQuery:any,publishStatus:any) {
  return client.get<any>(`/manage/courses/?searchQuery=${searchQuery? searchQuery:''}&publishStatus=${publishStatus}`, {}).then((r) => r.data.data);
}

export function getOrgCoursesById(id: string) {
  return client.get<any>('/manage/courses/' + id, {}).then((r) => r.data.data);
}

export function getOrgCourseUsers(id: string) {
  return client
    .get<any>('/manage/courses/' + id + '/users', {})
    .then((r) => r.data.data);
}

export function getOrgUsers() {
  return client.get<any>('/manage/users/').then((r) => r.data.data);
}

export function inviteUserToOrg(data: any) {
  return client.post('/manage/users/invites', data).then((r) => r.data.data);
}

export function getPendingOrgInvitations() {
  return client.get('/manage/users/invites').then((r) => r.data.data);
}

export function getCurrentOrganization() {
  return client.get('/org/current').then((r) => r.data.data);
}

export function updateCurrentOrganization(data: any) {
  return client.post('/org/current', data).then((r) => r.data.data);
}

export function getOrgStats() {
  return client.get('/org//dashboard-data').then((r) => r.data.data);
}

export function updateCourseStatus(data: any) {
  return client.post(`/manage/courses/${data.courseId}/update-status`, data).then((r) => r.data.data);
}
// END MANAGEMENT

export function enrollInCourse(id: string) {
  return client.post(`/courses/${id}/enroll/`, {}).then((r) => r.data.data);
}

export function completeCourse(data: {
  courseId: string;
  review: string;
  rating: number;
}) {
  return client.post(`/courses/${data.courseId}/complete-course`, data);
}

export function createNewQuiz(data: any) {
  return client
    .post(`/manage/courses/${data.form.course}/quiz/`, data.form)
    .then((r) => r.data.data);
}

export function updateQuiz(data: any) {
  return client
    .put(`/manage/courses/${data.course}/quiz/${data.examId}`, data.form)
    .then((r) => r.data.data);
}

export function getQuizById(courseId: string, quizId: string) {
  return client
    .get<any>(`/manage/courses/${courseId}/quiz/${quizId}`)
    .then((r) => r.data.data);
}

export function getQuizDetails(courseId: string, quizId: string) {
  return client
    .get<any>(`/courses/${courseId}/quiz/${quizId}`)
    .then((r) => r.data.data);
}

export function getAttemptById(
  courseId: string,
  quizId: string,
  attemptId: string
) {
  return client
    .get<any>(`/courses/${courseId}/quiz/${quizId}/attempt/${attemptId}`)
    .then((r) => r.data.data);
}

export function createNewAttempt(data: any) {
  return client
    .post(
      `/courses/${data.courseId}/quiz/${data.quizId}/attempt/create`,
      data.form
    )
    .then((r) => r.data.data);
}

export function updateAttempt(data: any) {
  return client
    .post(
      `/courses/${data.courseId}/quiz/${data.quizId}/attempt/${data.attemptId}/update`,
      data.submissions
    )
    .then((r) => r.data.data);
}

export function completeAttempt(data: any) {
  return client
    .post(
      `/manage/courses/${data.courseId}/quiz/${data.quizId}/attempt/${data.attemptId}/complete`,
      data.submissions
    )
    .then((r) => r.data.data);
}

export function getResults(
  courseId: string,
  quizId: string,
  attemptId: string
) {
  return client
    .get<any>(
      `/courses/${courseId}/quiz/${quizId}/attempt/${attemptId}/results`
    )
    .then((r) => r.data.data);
}

export function getQuizzesByCourseId(courseId: string) {
  return client
    .get<any>(`/manage/courses/${courseId}/quizzes`)
    .then((r) => r.data.data);
}

export function submitQuiz(data: any) {
  return client
    .post(`/courses/${data.courseId}/quiz/${data.quizId}/submit`, data)
    .then((r) => r.data.data);
}
