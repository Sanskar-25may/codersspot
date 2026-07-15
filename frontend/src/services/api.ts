import axios from 'axios';

// Smart LocalStorage-based DB fallback for fully interactive Vercel preview presentations
const resolveMockData = (url: string, data: any) => {
  const normalizedUrl = url.toLowerCase();
  
  // 1. CMS CONTENT SERVICES
  if (normalizedUrl.includes('/cms/')) {
    const pageId = normalizedUrl.split('/cms/')[1].replace('/', '');
    if (pageId === 'landing') {
      let saved = localStorage.getItem('mock_cms_landing');
      if (saved && saved.includes('Build skills that')) {
        localStorage.removeItem('mock_cms_landing');
        saved = null;
      }
      if (saved) {
        return { data: { content: JSON.parse(saved) } };
      }
      
      const initial = {
        headline_normal: "Master Skills that",
        headline_bold: "get you hired",
        subtext: "Project-based engineering courses taught by the industry's top 1%.",
        stats: [
          { value: "10,000+", label: "Students Trained" },
          { value: "98%", label: "Satisfaction Rate" },
          { value: "4.9★", label: "Mentor Rating" },
          { value: "96%", label: "Placement Hikes" }
        ],
        features: [
          { 
            title: "Project-Based Learning", 
            desc: "Build production apps using real architectures (Django REST, Vite SPAs, Docker containers) instead of just watching videos.",
            col_span: "lg:col-span-2"
          },
          { 
            title: "Live Peer Cohorts", 
            desc: "Engage in daily standups and code reviews with fellow peer developers.",
            col_span: ""
          },
          { 
            title: "Verified Credentials", 
            desc: "Get digital certificates cryptographically signed by industry mentors.",
            col_span: ""
          },
          { 
            title: "VPS Deployments", 
            desc: "Configure Nginx, SSL domain routing, and PostgreSQL databases on live KVM containers.",
            col_span: "lg:col-span-2"
          }
        ]
      };
      localStorage.setItem('mock_cms_landing', JSON.stringify(initial));
      return { data: { content: initial } };
    }
    return { data: { content: { headline: "Dynamic CMS Panel", story: "Dynamic CMS fallback loading systems." } } };
  }

  if (normalizedUrl.includes('/cms/update/')) {
    const pageId = normalizedUrl.split('/cms/update/')[1].replace('/', '');
    if (pageId === 'landing') {
      const parsed = JSON.parse(data || '{}');
      localStorage.setItem('mock_cms_landing', JSON.stringify(parsed.content));
      return { data: { message: "CMS content updated successfully.", content: parsed.content } };
    }
    return { data: { message: "Mock CMS update success" } };
  }
  
  // 2. AUTHENTICATION SERVICES
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

  // 3. COURSE LISTING SERVICES
  if (normalizedUrl.includes('/courses/')) {
    const saved = localStorage.getItem('mock_courses');
    if (saved) {
      return { data: JSON.parse(saved) };
    }
    const initial = [
      {
        id: "c1-uuid",
        title: "Full Stack React & Next.js",
        faculty_name: "Instructor Avatar",
        description: "Master component architectures, context state managers, Tailwind CSS tokens, and static pre-rendering structures.",
        price: 4999.00,
        level: "Intermediate",
        status: "PUBLISHED",
        lessons: [
          {
            id: "l1-uuid",
            title: "Introduction & Scaffold Setup",
            content: "Learn how to scaffold your React TS projects using Vite or Next.js layout structures.",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            sortOrder: 1
          },
          {
            id: "l2-uuid",
            title: "Routing & Page Navigation",
            content: "Set up React Router v7 protected navigation and route boundaries.",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            sortOrder: 2
          }
        ]
      },
      {
        id: "c2-uuid",
        title: "System Design & Scale",
        faculty_name: "Instructor Avatar",
        description: "Explore vertical/horizontal scaling, caching grids (Redis), load balancing, and database sharding techniques.",
        price: 6999.00,
        level: "Advanced",
        status: "PUBLISHED",
        lessons: [
          {
            id: "l3-uuid",
            title: "DB Sharding & Partitioning",
            content: "Deep dive into partitioning keys, database replicas, and low latency caching layers.",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            sortOrder: 1
          }
        ]
      }
    ];
    localStorage.setItem('mock_courses', JSON.stringify(initial));
    return { data: initial };
  }

  // 4. FACULTY PORTAL SERVICES
  if (normalizedUrl.includes('/faculty/courses/create/')) {
    const parsed = JSON.parse(data || '{}');
    const saved = localStorage.getItem('mock_courses');
    const courses = saved ? JSON.parse(saved) : [];
    const newCourse = {
      id: "c_" + Math.random().toString(36).substr(2, 9),
      title: parsed.title,
      description: parsed.description,
      price: parsed.price || 0,
      faculty_name: "Instructor Avatar",
      status: "DRAFT",
      lessons: []
    };
    courses.push(newCourse);
    localStorage.setItem('mock_courses', JSON.stringify(courses));
    return {
      data: {
        message: "Course draft created successfully. Awaiting Admin approval.",
        course: newCourse
      }
    };
  }

  if (normalizedUrl.includes('/faculty/courses/builder/lesson/')) {
    const parsed = JSON.parse(data || '{}');
    const saved = localStorage.getItem('mock_courses');
    const courses = saved ? JSON.parse(saved) : [];
    const course = courses.find((c: any) => c.id === parsed.course_id);
    const newLesson = {
      id: "l_" + Math.random().toString(36).substr(2, 9),
      title: parsed.title,
      content: parsed.content,
      videoUrl: parsed.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4",
      sortOrder: parsed.sortOrder || 1
    };
    if (course) {
      if (!course.lessons) course.lessons = [];
      course.lessons.push(newLesson);
      course.lessons.sort((a: any, b: any) => a.sortOrder - b.sortOrder);
      localStorage.setItem('mock_courses', JSON.stringify(courses));
    }
    return {
      data: {
        message: "Lesson added successfully to curriculum.",
        lesson: newLesson
      }
    };
  }

  // 5. ADMIN PORTAL SERVICES
  if (normalizedUrl.includes('/admin/courses/approve/')) {
    const courseId = normalizedUrl.split('/admin/courses/approve/')[1].replace('/', '');
    const parsed = JSON.parse(data || '{}');
    const saved = localStorage.getItem('mock_courses');
    const courses = saved ? JSON.parse(saved) : [];
    const course = courses.find((c: any) => c.id === courseId);
    if (course) {
      course.status = parsed.status;
      localStorage.setItem('mock_courses', JSON.stringify(courses));
    }
    return {
      data: {
        message: `Course status updated to ${parsed.status} successfully.`,
        course
      }
    };
  }

  if (normalizedUrl.includes('/admin/dashboard/')) {
    const savedCourses = localStorage.getItem('mock_courses');
    const courses = savedCourses ? JSON.parse(savedCourses) : [];
    const pending_courses = courses.filter((c: any) => c.status === 'DRAFT');
    return {
      data: {
        total_users: 124,
        students_count: 98,
        faculty_count: 26,
        pending_count: pending_courses.length,
        pending_courses
      }
    };
  }

  if (normalizedUrl.includes('/admin/users/')) {
    return {
      data: [
        { id: "u1", email: "student@codersspot.com", full_name: "ACTIVE STUDENT", role: "STUDENT", isOnboarded: true, date_joined: new Date().toISOString() },
        { id: "u2", email: "faculty@codersspot.com", full_name: "CURRICULUM MENTOR", role: "FACULTY", isOnboarded: true, date_joined: new Date().toISOString() },
        { id: "u3", email: "admin@codersspot.com", full_name: "SUPER ADMIN", role: "ADMIN", isOnboarded: true, date_joined: new Date().toISOString() }
      ]
    };
  }

  // 6. STUDENT PORTAL SERVICES
  if (normalizedUrl.includes('/student/enroll/')) {
    const parsed = JSON.parse(data || '{}');
    const savedCourses = localStorage.getItem('mock_courses');
    const courses = savedCourses ? JSON.parse(savedCourses) : [];
    const course = courses.find((c: any) => c.id === parsed.course_id);
    
    const savedEnr = localStorage.getItem('mock_enrollments');
    const enrollments = savedEnr ? JSON.parse(savedEnr) : [];
    
    let enrollment = enrollments.find((e: any) => e.course.id === parsed.course_id);
    if (!enrollment && course) {
      enrollment = {
        id: "enr_" + Math.random().toString(36).substr(2, 9),
        course: course,
        progress: 0,
        createdAt: new Date().toISOString()
      };
      enrollments.push(enrollment);
      localStorage.setItem('mock_enrollments', JSON.stringify(enrollments));
    }
    return {
      data: {
        message: "Enrolled in course successfully.",
        enrollment
      }
    };
  }

  if (normalizedUrl.includes('/student/dashboard/')) {
    const savedEnr = localStorage.getItem('mock_enrollments');
    const enrollments = savedEnr ? JSON.parse(savedEnr) : [];
    
    const enrolled_count = enrollments.length;
    const completed_count = enrollments.filter((e: any) => e.progress === 100).length;
    const total_progress = enrollments.reduce((acc: number, curr: any) => acc + curr.progress, 0);
    const avg_progress = enrolled_count > 0 ? Math.round(total_progress / enrolled_count) : 0;
    
    return {
      data: {
        enrolled_count,
        completed_count,
        avg_progress,
        study_hours_mock: Math.round((1.2 * enrolled_count + 8.5) * 10) / 10,
        active_course: enrollments.length > 0 ? enrollments[0] : null,
        enrollments
      }
    };
  }

  if (normalizedUrl.includes('/student/classroom/')) {
    if (normalizedUrl.endsWith('/progress/')) {
      const courseId = normalizedUrl.split('/student/classroom/')[1].replace('/progress/', '');
      const parsed = JSON.parse(data || '{}');
      const savedEnr = localStorage.getItem('mock_enrollments');
      const enrollments = savedEnr ? JSON.parse(savedEnr) : [];
      const enrollment = enrollments.find((e: any) => e.course.id === courseId);
      if (enrollment) {
        enrollment.progress = parsed.progress;
        localStorage.setItem('mock_enrollments', JSON.stringify(enrollments));
      }
      return {
        data: {
          message: "Classroom progress updated successfully.",
          progress: parsed.progress
        }
      };
    }
    
    const courseId = normalizedUrl.split('/student/classroom/')[1].replace('/', '');
    const savedCourses = localStorage.getItem('mock_courses');
    const courses = savedCourses ? JSON.parse(savedCourses) : [];
    const course = courses.find((c: any) => c.id === courseId);
    
    const savedEnr = localStorage.getItem('mock_enrollments');
    const enrollments = savedEnr ? JSON.parse(savedEnr) : [];
    const enrollment = enrollments.find((e: any) => e.course.id === courseId);
    
    return {
      data: {
        course,
        progress: enrollment ? enrollment.progress : 0
      }
    };
  }

  // 7. CHAT SERVICES
  if (normalizedUrl.includes('/chat/rooms/')) {
    if (data) {
      const parsed = JSON.parse(data || '{}');
      if (parsed.name) {
        const saved = localStorage.getItem('mock_chat_rooms');
        const rooms = saved ? JSON.parse(saved) : [];
        const newRoom = {
          id: "r_" + Math.random().toString(36).substr(2, 9),
          name: parsed.name,
          createdAt: new Date().toISOString()
        };
        rooms.push(newRoom);
        localStorage.setItem('mock_chat_rooms', JSON.stringify(rooms));
        return { data: newRoom };
      }
    }

    const saved = localStorage.getItem('mock_chat_rooms');
    if (saved) {
      return { data: JSON.parse(saved) };
    }
    const initial = [
      { id: "r1-uuid", name: "General Announcements" },
      { id: "r2-uuid", name: "Coding Lounge" }
    ];
    localStorage.setItem('mock_chat_rooms', JSON.stringify(initial));
    return { data: initial };
  }

  if (normalizedUrl.includes('/messages/')) {
    const roomId = normalizedUrl.split('/chat/rooms/')[1].replace('/messages/', '');
    const saved = localStorage.getItem(`mock_chat_messages_${roomId}`);
    const messages = saved ? JSON.parse(saved) : [
      { 
        id: "m1", 
        sender_name: "Instructor", 
        sender_email: "faculty@codersspot.com", 
        content: "Welcome to the class workspace! Feel free to ask questions.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() 
      }
    ];

    if (data) {
      const parsed = JSON.parse(data || '{}');
      if (parsed.content) {
        const newMessage = {
          id: "m_" + Math.random().toString(36).substr(2, 9),
          sender_name: "Me",
          sender_email: "student@codersspot.com",
          content: parsed.content,
          timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        localStorage.setItem(`mock_chat_messages_${roomId}`, JSON.stringify(messages));
        return { data: newMessage };
      }
    }
    
    return { data: messages };
  }

  // Fallback default
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
    
    // Enable seamless browser demo fallback on connection failures (LocalStorage-based sandbox database)
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
