import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboard, approveCourse } from '../../services/courses';

export default function CourseApproval() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const loadData = () => {
    getAdminDashboard()
      .then((data) => {
        setCourses(data.pending_courses || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (courseId: string, status: 'PUBLISHED' | 'DRAFT') => {
    setMessage(null);
    try {
      await approveCourse(courseId, status);
      setMessage(status === 'PUBLISHED' ? "Course approved and published!" : "Course draft rejected.");
      loadData();
    } catch {
      setMessage("Failed to update course approval status.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight heading-font">Course Approvals Queue</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Review instructor curriculum drafts and publish syllabus tracks.</p>
        </div>
        <Link to="/admin" className="text-xs font-bold text-violet-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>

      {message && (
        <div className="p-4 rounded-xl border border-emerald-500/20 text-xs font-bold text-emerald-500" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
          ✓ {message}
        </div>
      )}

      {/* Approvals grid */}
      <div className="p-8 rounded-3xl border glass flex-1">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            No draft curriculum modules are currently awaiting approvals.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course: any) => (
              <div key={course.id} className="p-6 rounded-2xl border flex flex-col justify-between space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm font-bold">{course.title}</h3>
                    <span className="text-[10px] font-bold text-violet-500 uppercase">
                      ₹{parseFloat(course.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    Instructor: {course.faculty_name}
                  </p>
                  <p className="text-xs font-medium leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                    {course.description}
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
                  <button
                    onClick={() => handleAction(course.id, 'PUBLISHED')}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-md transition-all"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(course.id, 'DRAFT')}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all text-red-500 hover:bg-red-500/5"
                    style={{ borderColor: 'var(--border-soft)' }}
                  >
                    Reject
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
