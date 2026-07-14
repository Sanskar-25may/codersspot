import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboard, approveCourse } from '../../services/courses';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadData = () => {
    getAdminDashboard()
      .then((data) => {
        setDashboardData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (courseId: string) => {
    try {
      await approveCourse(courseId, 'PUBLISHED');
      setActionMessage("Course approved successfully!");
      loadData();
    } catch {
      setActionMessage("Failed to approve course.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  const data = dashboardData || {
    total_users: 0,
    students_count: 0,
    faculty_count: 0,
    pending_count: 0,
    pending_courses: []
  };

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight heading-font">Admin Console</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Moderation controls, user access directories, and dynamic CMS configurations.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link 
            to="/admin/users"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-500 hover:bg-violet-600 transition-all shadow-md"
          >
            User Profiles
          </Link>
          <Link 
            to="/admin/courses"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-all shadow-md"
          >
            Course Approvals
          </Link>
          <Link 
            to="/admin/cms"
            className="px-4 py-2 rounded-xl text-xs font-bold border transition-all"
            style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
          >
            CMS Site Editor
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-xl border border-emerald-500/20 text-xs font-bold text-emerald-500" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
          ✓ {actionMessage}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">👥</span>
          <h3 className="text-2xl font-extrabold">{data.total_users}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Total Accounts</p>
        </div>

        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">🎓</span>
          <h3 className="text-2xl font-extrabold">{data.students_count}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Students</p>
        </div>

        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">💼</span>
          <h3 className="text-2xl font-extrabold">{data.faculty_count}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Faculty</p>
        </div>

        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">⏳</span>
          <h3 className="text-2xl font-extrabold">{data.pending_count}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Pending Approvals</p>
        </div>
      </div>

      {/* Pending Course Approvals List */}
      <div className="p-8 rounded-3xl border glass space-y-6">
        <h2 className="text-xl font-bold">Course Submissions Pending Review</h2>

        {data.pending_courses.length === 0 ? (
          <div className="text-center py-12 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            No courses are currently waiting for administrative approvals.
          </div>
        ) : (
          <div className="space-y-4">
            {data.pending_courses.map((course: any) => (
              <div key={course.id} className="p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold">{course.title}</h3>
                  <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                    Instructor: {course.faculty_name} | Price: ₹{parseFloat(course.price).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs font-medium max-w-xl" style={{ color: 'var(--text-secondary)' }}>{course.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(course.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-md"
                  >
                    Approve & Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
