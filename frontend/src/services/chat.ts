import api from './api';

export const getChatRooms = async () => {
  const response = await api.get('/chat/rooms/');
  return response.data;
};

export const createChatRoom = async (name: string) => {
  const response = await api.post('/chat/rooms/', { name });
  return response.data;
};

export const getRoomMessages = async (roomId: string) => {
  const response = await api.get(`/chat/rooms/${roomId}/messages/`);
  return response.data;
};

export const postRoomMessage = async (roomId: string, content: string) => {
  const response = await api.post(`/chat/rooms/${roomId}/messages/`, { content });
  return response.data;
};
