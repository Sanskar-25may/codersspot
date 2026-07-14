import api from './api';

export const getPageContent = async (pageId: string) => {
  const response = await api.get(`/cms/${pageId}/`);
  return response.data.content;
};

export const updatePageContent = async (pageId: string, content: any) => {
  const response = await api.put(`/cms/update/${pageId}/`, { content });
  return response.data;
};
