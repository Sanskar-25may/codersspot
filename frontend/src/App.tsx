import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DynamicBackground from './components/DynamicBackground';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import PlacementsPage from './pages/public/PlacementsPage';
import TestimonialsPage from './pages/public/TestimonialsPage';
import ContactPage from './pages/public/ContactPage';
import CoursesPage from './pages/public/CoursesPage';

// Auth Pages
import AuthPage from './pages/auth/AuthPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';

// Student Portal Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCoursesPage from './pages/student/MyCoursesPage';
import ClassroomPage from './pages/student/ClassroomPage';

// Faculty Portal Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import CourseWizard from './pages/faculty/CourseWizard';
import CourseBuilder from './pages/faculty/CourseBuilder';
import SubmissionsQueue from './pages/faculty/SubmissionsQueue';
import GradingPortal from './pages/faculty/GradingPortal';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseApproval from './pages/admin/CourseApproval';
import CmsManager from './pages/admin/CmsManager';

// Chat Portal Pages
import ChatCenter from './pages/chat/ChatCenter';

function DashboardRouter() {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/auth" replace />;
  
  const targetRoute = 
    user.role === 'ADMIN' ? '/admin' : 
    user.role === 'FACULTY' ? '/faculty' : '/student';
    
  return <Navigate to={targetRoute} replace />;
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <DynamicBackground />
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/courses" element={<CoursesPage />} />

          {/* Auth Pages */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Onboarding */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'FACULTY']} checkOnboarded={false}>
                <OnboardingPage />
              </ProtectedRoute>
            } 
          />

          {/* Protected Portals */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/courses" 
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <MyCoursesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/classroom/:course_id" 
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <ClassroomPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/faculty" 
            element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <FacultyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/faculty/courses/create" 
            element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <CourseWizard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/faculty/courses/builder/:course_id" 
            element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <CourseBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/faculty/submissions" 
            element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <SubmissionsQueue />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/faculty/submissions/grade/:submission_id" 
            element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <GradingPortal />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/courses" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <CourseApproval />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/cms" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <CmsManager />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/chat" 
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'FACULTY', 'ADMIN']}>
                <ChatCenter />
              </ProtectedRoute>
            } 
          />

          {/* Fallbacks */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
