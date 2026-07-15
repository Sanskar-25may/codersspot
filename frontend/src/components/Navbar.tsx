import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Read saved preference; default to dark
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cs-theme');
    return saved ? saved === 'dark' : true;
  });

  // Apply theme class on mount and whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cs-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cs-theme', 'light');
    }
  }, [darkMode]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setDarkMode((d) => !d);

  // Hide public navbar on portal routes
  const isPortalRoute = 
    location.pathname.startsWith('/student') || 
    location.pathname.startsWith('/faculty') || 
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/auth') ||
    location.pathname.startsWith('/onboarding');

  if (isPortalRoute) return null;

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
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
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-xs text-white heading-font tracking-tight">CS</span>
            </div>
            {/* Live green dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 ring-0 pulse-dot" style={{ borderColor: 'var(--bg-base)' }} />
          </div>
          <span className="font-extrabold text-xl tracking-tight heading-font" style={{ color: 'var(--text-primary)' }}>
            Coders<span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">Spot</span>
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
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-[11px] font-bold tracking-widest transition-all duration-200 hover:scale-105"
            style={{
              borderColor: darkMode ? 'var(--accent-green)' : 'var(--accent-amber)',
              background: darkMode
                ? 'color-mix(in srgb, var(--accent-green) 10%, transparent)'
                : 'color-mix(in srgb, var(--accent-amber) 10%, transparent)',
              color: darkMode ? 'var(--accent-green)' : 'var(--accent-amber)',
            }}
          >
            {darkMode ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m12.728 0-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z"/>
                </svg>
                LIGHT
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                DARK
              </>
            )}
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
              className="py-2.5 text-center text-xs font-bold border rounded-xl mono-font tracking-widest transition-all"
              style={{
                borderColor: darkMode ? 'var(--accent-green)' : 'var(--accent-amber)',
                color: darkMode ? 'var(--accent-green)' : 'var(--accent-amber)',
                background: darkMode
                  ? 'color-mix(in srgb, var(--accent-green) 8%, transparent)'
                  : 'color-mix(in srgb, var(--accent-amber) 8%, transparent)',
              }}
            >
              {darkMode ? '☀ Switch to Light' : '🌙 Switch to Dark'}
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
