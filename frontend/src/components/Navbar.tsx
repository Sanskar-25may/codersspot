import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Scroll listener to add backdrop blur styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state with HTML dark class
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Hide public navbar on portal routes
  const isPortalRoute = 
    location.pathname.startsWith('/student') || 
    location.pathname.startsWith('/faculty') || 
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/auth') ||
    location.pathname.startsWith('/onboarding');

  if (isPortalRoute) return null;

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Placements', path: '/placements' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md shadow-lg border-b' : 'bg-transparent'}`}
      style={{ 
        background: scrolled ? 'color-mix(in srgb, var(--bg-card) 70%, transparent)' : 'transparent',
        borderColor: scrolled ? 'var(--border-soft)' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 p-0.5 animate-pulse">
            <div className="w-full h-full rounded-full" style={{ background: 'var(--bg-card)' }}></div>
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent heading-font">
            CodersSpot
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path}
                className="text-sm font-semibold tracking-wide hover:opacity-80 transition-all"
                style={{ color: active ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions (Auth / Mode Switcher) */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-xl border hover:opacity-80 transition-all"
            style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface)' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to={user.role === 'ADMIN' ? '/admin' : user.role === 'FACULTY' ? '/faculty' : '/student'}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 shadow-md transition-all"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/auth" 
                className="px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
              >
                Sign In
              </Link>
              <Link 
                to="/auth" 
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 shadow-md transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl border"
          style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface)' }}
        >
          ☰
        </button>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b p-6 flex flex-col space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
          {links.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold py-1"
              style={{ color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t pt-4 flex flex-col space-y-3" style={{ borderColor: 'var(--border-soft)' }}>
            <button 
              onClick={() => { toggleTheme(); setMobileOpen(false); }}
              className="py-2 text-center text-xs font-bold border rounded-xl"
              style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface)' }}
            >
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
            {user ? (
              <>
                <Link 
                  to={user.role === 'ADMIN' ? '/admin' : user.role === 'FACULTY' ? '/faculty' : '/student'}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="py-2 text-center text-xs font-bold border rounded-xl"
                  style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-center text-xs font-bold border rounded-xl"
                  style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth" 
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
