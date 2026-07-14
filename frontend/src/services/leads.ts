import api from './api';

export const submitContactMessage = async (payload: { name: string; email: string; subject: string; message: string }) => {
  const response = await api.post('/leads/contact/', payload);
  return response.data;
};

export const submitCareerGuidance = async (payload: { name: string; email: string; phone: string; experience: string }) => {
  const response = await api.post('/leads/careers/', payload);
  return response.data;
};

export const getAdminLeads = async () => {
  const response = await api.get('/admin/leads/');
  return response.data;
};
