import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudentDashboard } from '../../services/courses';

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStudentDashboard()
      .then((data) => {
        setEnrollments(data.enrollments || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight heading-font">My Enrolled Courses</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Track your lecture progress and complete course modules.</p>
        </div>
        <Link 
          to="/courses"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:opacity-95 transition-all"
        >
          Browse Catalog
        </Link>
      </div>

      {/* Grid */}
      {enrollments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <span className="text-4xl">📂</span>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>You are not enrolled in any courses.</p>
          <Link to="/courses" className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md">Find your first course</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrollments.map((enr: any) => (
            <div key={enr.id} className="p-6 rounded-3xl border glass card-hover flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                  By {enr.course.faculty_name}
                </span>
                <h3 className="text-lg font-bold">{enr.course.title}</h3>
                <p className="text-xs line-clamp-3 font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {enr.course.description}
                </p>
              </div>

              {/* Progress and Action */}
              <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
                <div className="flex justify-between text-xs font-bold">
                  <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                  <span>{enr.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-500 to-cyan-500 h-full" style={{ width: `${enr.progress}%` }}></div>
                </div>
                <Link 
                  to={`/student/classroom/${enr.course.id}`}
                  className="block w-full py-2.5 rounded-xl text-center text-xs font-bold text-white bg-violet-500 hover:bg-violet-600 shadow-md transition-all"
                >
                  Enter Classroom
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
