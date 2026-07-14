import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.JSX.Element;
  allowedRoles?: ('STUDENT' | 'FACULTY' | 'ADMIN')[];
  checkOnboarded?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles, 
  checkOnboarded = true 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
          <span className="text-sm font-semibold tracking-wide shimmer-text" style={{ color: 'var(--text-secondary)' }}>Loading Session...</span>
        </div>
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Logged in but not onboarded -> redirect to onboarding
  if (checkOnboarded && !user.onboarded && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // Onboarded user trying to access onboarding -> redirect to dashboard
  if (user.onboarded && location.pathname === '/onboarding') {
    const dashboardRoute = 
      user.role === 'ADMIN' ? '/admin' : 
      user.role === 'FACULTY' ? '/faculty' : '/student';
    return <Navigate to={dashboardRoute} replace />;
  }

  // Unauthorized role -> redirect to default dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardRoute = 
      user.role === 'ADMIN' ? '/admin' : 
      user.role === 'FACULTY' ? '/faculty' : '/student';
    return <Navigate to={dashboardRoute} replace />;
  }

  return children;
}
