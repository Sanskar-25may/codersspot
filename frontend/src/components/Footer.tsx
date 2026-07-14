import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  // Hide footer on portal routes
  const isPortalRoute = 
    location.pathname.startsWith('/student') || 
    location.pathname.startsWith('/faculty') || 
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/auth') ||
    location.pathname.startsWith('/onboarding');

  if (isPortalRoute) return null;

  return (
    <footer className="border-t py-12 px-6 mt-auto transition-colors duration-300" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 p-0.5">
              <div className="w-full h-full rounded-full" style={{ background: 'var(--bg-card)' }}></div>
            </div>
            <span className="font-bold text-lg heading-font">CodersSpot</span>
          </div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            Build skills that ship real software. Led by industry engineers.
          </p>
        </div>

        {/* Learn Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Learn</h4>
          <ul className="space-y-1.5 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            <li><Link to="/courses" className="hover:opacity-85">All Courses</Link></li>
            <li><Link to="/curriculum" className="hover:opacity-85">Curriculum specs</Link></li>
            <li><Link to="/live" className="hover:opacity-85">Live Cohorts</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Company</h4>
          <ul className="space-y-1.5 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            <li><Link to="/about" className="hover:opacity-85">About Us</Link></li>
            <li><Link to="/placements" className="hover:opacity-85">Placements</Link></li>
            <li><Link to="/testimonials" className="hover:opacity-85">Testimonials</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Legal</h4>
          <ul className="space-y-1.5 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            <li><Link to="/privacy" className="hover:opacity-85">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:opacity-85">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] font-semibold" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-tertiary)' }}>
        <span>© {new Date().getFullYear()} CodersSpot. All rights reserved.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:opacity-85">GitHub</a>
          <a href="#" className="hover:opacity-85">LinkedIn</a>
          <a href="#" className="hover:opacity-85">Discord</a>
        </div>
      </div>
    </footer>
  );
}
