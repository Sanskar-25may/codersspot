import axios from 'axios';

// Mock database fallback for Vercel demo presentations
const resolveMockData = (url: string, data: any) => {
  const normalizedUrl = url.toLowerCase();
  
  if (normalizedUrl.includes('/cms/')) {
    const pageId = normalizedUrl.split('/cms/')[1].replace('/', '');
    if (pageId === 'landing') {
      return {
        data: {
          content: {
            headline: "Build skills that ship real products.",
            subtitle: "Master component architectures, dynamic CMS settings, and live evaluation engines.",
            students: "12,000+ Enrolled Students",
            hikes: "96% Placement Hikes"
          }
        }
      };
    }
    // Default page content mock
    return { data: { content: { headline: "Dynamic CMS Panel", story: "Dynamic CMS fallback loading systems." } } };
  }
  
  if (normalizedUrl.includes('/auth/login/')) {
    const parsed = JSON.parse(data || '{}');
    const role = parsed.email?.includes('faculty') ? 'FACULTY' : parsed.email?.includes('admin') ? 'ADMIN' : 'STUDENT';
    const email = parsed.email || 'student@codersspot.com';
    return {
      data: {
        access: "mock_access_token",
        refresh: "mock_refresh_token",
        user: {
          id: "mock-user-id-uuid",
          email,
          full_name: email.split('@')[0].toUpperCase(),
          role,
          isOnboarded: true
        }
      }
    };
  }

  if (normalizedUrl.includes('/auth/profile/')) {
    return {
      data: {
        email: "student@codersspot.com",
        full_name: "DEVELOPER STUDENT",
        role: "STUDENT",
        isOnboarded: true
      }
    };
  }

  if (normalizedUrl.includes('/courses/')) {
    return {
      data: [
        {
          id: "c1-uuid",
          title: "Full Stack React & Next.js",
          faculty_name: "Instructor Avatar",
          description: "Master React, Vite, TS, and Tailwind CSS v4 systems.",
          price: 4999.00,
          status: "PUBLISHED"
        },
        {
          id: "c2-uuid",
          title: "System Design & Scale",
          faculty_name: "Instructor Avatar",
          description: "Learn horizontal scaling, Redis caching, and DB sharding.",
          price: 6999.00,
          status: "PUBLISHED"
        }
      ]
    };
  }

  if (normalizedUrl.includes('/student/dashboard/')) {
    return {
      data: {
        enrolled_count: 2,
        completed_count: 0,
        avg_progress: 35,
        study_hours_mock: 10.5,
        active_course: {
          course: {
            id: "c1-uuid",
            title: "Full Stack React & Next.js",
            faculty_name: "Instructor Avatar"
          },
          progress: 35
        },
        enrollments: [
          {
            id: "enr-1",
            course: {
              id: "c1-uuid",
              title: "Full Stack React & Next.js",
              faculty_name: "Instructor Avatar"
            },
            progress: 35
          }
        ]
      }
    };
  }

  if (normalizedUrl.includes('/student/classroom/')) {
    return {
      data: {
        course: {
          id: "c1-uuid",
          title: "Full Stack React & Next.js",
          lessons: [
            {
              id: "l1-uuid",
              title: "Introduction & Scaffold Setup",
              content: "Learn how to scaffold your React TS projects using Vite.",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              sortOrder: 1
            },
            {
              id: "l2-uuid",
              title: "Routing & Page Navigation",
              content: "Set up React Router protected navigation.",
              videoUrl: "https://www.w3schools.com/html/movie.mp4",
              sortOrder: 2
            }
          ]
        },
        progress: 35
      }
    };
  }

  if (normalizedUrl.includes('/faculty/dashboard/')) {
    return {
      data: {
        courses_count: 1,
        enrolled_count: 18,
        revenue_mock: 249000,
        courses: [
          {
            id: "c1-uuid",
            title: "Full Stack React & Next.js",
            price: "4999.00",
            status: "PUBLISHED"
          }
        ]
      }
    };
  }

  if (normalizedUrl.includes('/admin/dashboard/')) {
    return {
      data: {
        total_users: 124,
        students_count: 98,
        faculty_count: 26,
        pending_count: 1,
        pending_courses: [
          {
            id: "c_draft-uuid",
            title: "Advanced PyTorch & ML Models",
            faculty_name: "AI Scientist",
            price: "8999.00",
            description: "Deep dive into PyTorch gradient models and neural grids."
          }
        ]
      }
    };
  }

  if (normalizedUrl.includes('/chat/rooms/')) {
    return {
      data: [
        { id: "r1-uuid", name: "General Announcements" },
        { id: "r2-uuid", name: "Coding Lounge" }
      ]
    };
  }

  if (normalizedUrl.includes('/messages/')) {
    return {
      data: [
        { id: "m1", sender_name: "Instructor", sender_email: "faculty@codersspot.com", content: "Welcome to the class workspace!", timestamp: new Date().toISOString() }
      ]
    };
  }

  return { data: { message: "Mock operation completed successfully." } };
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Enable seamless browser demo fallback on connection failures
    if (!error.response || error.code === 'ERR_NETWORK') {
      console.warn("API Server offline. Engaging demo mode sandbox fallback for:", originalRequest.url);
      try {
        const mockRes = resolveMockData(originalRequest.url, originalRequest.data);
        return Promise.resolve(mockRes);
      } catch (mockErr) {
        return Promise.reject(error);
      }
    }
    
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/login')) {
      originalRequest._retry = true;
      
      try {
        const refresh = localStorage.getItem('refreshToken');
        if (!refresh) {
          throw new Error("No refresh token stored.");
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/refresh/`, 
          { refresh }
        );
        
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('auth_logout_redirect'));
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
