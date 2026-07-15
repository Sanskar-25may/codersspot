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

  // Capitalize path segments for display
  const formatSegment = (str: string) => {
    // If it looks like a UUID or ID (contains dashes, numbers, or hash-like length)
    if (str.length > 20 || str.includes('-') && /\d/.test(str)) {
      return str; // return raw ID as in screenshot
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Helper to build intermediate paths
  const getLinkPath = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 w-full z-20 flex items-center gap-1.5 text-xs font-semibold select-none">
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
