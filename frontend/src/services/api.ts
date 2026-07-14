import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send HTTP cookies (e.g. SimpleJWT refresh token cookie if configured)
});

// Request interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auto-refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/login')) {
      originalRequest._retry = true;
      
      try {
        const refresh = localStorage.getItem('refreshToken');
        if (!refresh) {
          throw new Error("No refresh token stored.");
        }

        // Call the refresh endpoint to obtain a new access token
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/refresh/`, 
          { refresh }
        );
        
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        
        // Update request header and retry the original call
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid -> log out user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redirect to login page
        window.dispatchEvent(new Event('auth_logout_redirect'));
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
