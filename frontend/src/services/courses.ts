import api from './api';

export const getCourses = async () => {
  const response = await api.get('/courses/');
  return response.data;
};

export const getCourseDetails = async (courseId: string) => {
  const response = await api.get(`/courses/${courseId}/`);
  return response.data;
};

export const enrollInCourse = async (courseId: string) => {
  const response = await api.post('/student/enroll/', { course_id: courseId });
  return response.data;
};

export const getStudentDashboard = async () => {
  const response = await api.get('/student/dashboard/');
  return response.data;
};

export const getClassroom = async (courseId: string) => {
  const response = await api.get(`/student/classroom/${courseId}/`);
  return response.data;
};

export const updateClassroomProgress = async (courseId: string, progress: number) => {
  const response = await api.put(`/student/classroom/${courseId}/progress/`, { progress });
  return response.data;
};

export const getFacultyDashboard = async () => {
  const response = await api.get('/faculty/dashboard/');
  return response.data;
};

export const createCourseDraft = async (payload: { title: string; description: string; price: number }) => {
  const response = await api.post('/faculty/courses/create/', payload);
  return response.data;
};

export const addLessonToCurriculum = async (payload: { course_id: string; title: string; content: string; videoUrl?: string; sortOrder: number }) => {
  const response = await api.post('/faculty/courses/builder/lesson/', payload);
  return response.data;
};

export const getFacultySubmissions = async (status: 'PENDING' | 'GRADED') => {
  const response = await api.get(`/faculty/submissions/?status=${status}`);
  return response.data;
};

export const gradeStudentSubmission = async (submissionId: string, payload: { grade: string; feedback: string }) => {
  const response = await api.put(`/faculty/submissions/grade/${submissionId}/`, payload);
  return response.data;
};

export const getSubmissionDetails = async (submissionId: string) => {
  const response = await api.get(`/faculty/submissions/grade/${submissionId}/`);
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard/');
  return response.data;
};

export const approveCourse = async (courseId: string, status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED') => {
  const response = await api.put(`/admin/courses/approve/${courseId}/`, { status });
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users/');
  return response.data;
};

export const updateUserRole = async (userId: string, role: 'STUDENT' | 'FACULTY' | 'ADMIN') => {
  const response = await api.put(`/admin/users/role/${userId}/`, { role });
  return response.data;
};
