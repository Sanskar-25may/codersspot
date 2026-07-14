import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import PlacementsPage from './pages/public/PlacementsPage';
import TestimonialsPage from './pages/public/TestimonialsPage';
import ContactPage from './pages/public/ContactPage';

// Auth Pages
import AuthPage from './pages/auth/AuthPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';

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
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />

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
                <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
                  <div className="p-8 rounded-3xl glass max-w-md text-center space-y-4">
                    <span className="text-4xl">🎓</span>
                    <h1 className="text-2xl font-bold">Student Dashboard</h1>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Welcome to the student learning center workspace. Module 3 details will load here.</p>
                    <button onClick={() => window.dispatchEvent(new Event('auth_logout_redirect'))} className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all">Sign Out</button>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/faculty" 
            element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
                  <div className="p-8 rounded-3xl glass max-w-md text-center space-y-4">
                    <span className="text-4xl">💼</span>
                    <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Welcome to the instructor curriculum portal. Module 4 details will load here.</p>
                    <button onClick={() => window.dispatchEvent(new Event('auth_logout_redirect'))} className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all">Sign Out</button>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
                  <div className="p-8 rounded-3xl glass max-w-md text-center space-y-4">
                    <span className="text-4xl">👑</span>
                    <h1 className="text-2xl font-bold">Admin Console</h1>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Super Admin Workspace. Restricted to codersspot97@gmail.com.</p>
                    <button onClick={() => window.dispatchEvent(new Event('auth_logout_redirect'))} className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all">Sign Out</button>
                  </div>
                </div>
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
