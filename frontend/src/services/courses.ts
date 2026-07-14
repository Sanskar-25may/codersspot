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
