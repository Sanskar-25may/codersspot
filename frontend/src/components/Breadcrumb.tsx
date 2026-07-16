import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
  const location = useLocation();
  const path = location.pathname;

  // List of public paths where we DO NOT want to show the portal breadcrumbs
  const isPublicPath =
    path === '/' ||
    path === '/about' ||
    path === '/courses' ||
    path === '/placements' ||
    path === '/testimonials' ||
    path === '/contact' ||
    path === '/community' ||
    path === '/projects' ||
    path.startsWith('/engineers');

  if (isPublicPath) return null;

  // Split path into segments
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  // Helper to query course title from database cache
  const getCourseName = (id: string) => {
    try {
      const saved = localStorage.getItem('mock_courses');
      if (saved) {
        const courses = JSON.parse(saved);
        const course = courses.find((c: any) => c.id === id);
        if (course) return course.title;
      }
    } catch {}

    const fallbacks: Record<string, string> = {
      'c1-uuid': 'Full Stack React & Next.js',
      'c2-uuid': 'System Design & Scale',
      'c3-uuid': 'Applied Machine Learning & AI',
      'full-stack-react': 'Full Stack React & Next.js',
      'system-design': 'System Design & Scale',
      'applied-ml': 'Applied Machine Learning & AI'
    };
    return fallbacks[id] || id;
  };

  // Capitalize path segments for display or translate IDs to names
  const formatSegment = (str: string) => {
    const isId = str.length > 15 || (str.includes('-') && /\d/.test(str)) || (str.startsWith('c') && str.includes('uuid'));
    if (isId) {
      return getCourseName(str);
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Helper to build intermediate paths
  const getLinkPath = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-2 w-full z-20 flex items-center gap-1.5 text-xs font-semibold select-none">
      {/* Home link */}
      <Link
        to="/"
        className="hover:underline transition-all"
        style={{ color: 'var(--text-secondary)' }}
      >
        Home
      </Link>

      {segments.map((segment, idx) => {
        const isLast = idx === segments.length - 1;
        const segmentName = formatSegment(segment);

        return (
          <span key={idx} className="flex items-center gap-1.5">
            <span style={{ color: 'var(--text-tertiary)' }}>/</span>
            {isLast ? (
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                {segmentName}
              </span>
            ) : (
              <Link
                to={getLinkPath(idx)}
                className="hover:underline transition-all"
                style={{ color: 'var(--text-secondary)' }}
              >
                {segmentName}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
