import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStudentDashboard } from '../../services/courses';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStudentDashboard()
      .then((data) => {
        setDashboardData(data);
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

  const data = dashboardData || {
    enrolled_count: 0,
    completed_count: 0,
    avg_progress: 0,
    study_hours_mock: 0,
    active_course: null,
    enrollments: []
  };

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-8 overflow-hidden bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.full_name || 'Student'}!</h1>
          <p className="text-sm opacity-90 max-w-md">Ready to master production software architecture and system scaling models?</p>
        </div>
        {data.active_course ? (
          <Link 
            to={`/student/classroom/${data.active_course.course.id}`}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-violet-600 hover:scale-105 transition-all shadow-md relative z-10"
          >
            Resume: {data.active_course.course.title}
          </Link>
        ) : (
          <Link 
            to="/courses"
            className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-violet-600 hover:scale-105 transition-all shadow-md relative z-10"
          >
            Explore Course Catalog
          </Link>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">📚</span>
          <h3 className="text-2xl font-extrabold">{data.enrolled_count}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Enrolled Courses</p>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">⏱️</span>
          <h3 className="text-2xl font-extrabold">{data.study_hours_mock}h</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Study Time</p>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">📊</span>
          <h3 className="text-2xl font-extrabold">{data.avg_progress}%</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Avg Progress</p>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">🏆</span>
          <h3 className="text-2xl font-extrabold">{data.completed_count}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Completed Tracks</p>
        </div>

      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrolled course list */}
        <div className="lg:col-span-2 p-8 rounded-3xl border glass space-y-6">
          <h2 className="text-xl font-bold">My Learning Curriculums</h2>
          
          {data.enrollments.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>You are not enrolled in any skill modules yet.</p>
              <Link to="/courses" className="inline-block px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md">Browse Catalog</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {data.enrollments.map((enr: any) => (
                <div key={enr.id} className="p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold">{enr.course.title}</h3>
                    <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Instructor: {enr.course.faculty_name}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none w-full sm:w-32 bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-violet-500 to-cyan-500 h-full" style={{ width: `${enr.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold w-8 text-right">{enr.progress}%</span>
                    <Link 
                      to={`/student/classroom/${enr.course.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-violet-500 hover:bg-violet-600 transition-all text-center"
                    >
                      Resume
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study tips / Info side card */}
        <div className="p-8 rounded-3xl border glass space-y-4 flex flex-col justify-between" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Cohorts & Career</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Complete curriculum assignments to gain placements referrals. Your performance is tracked in realtime by your faculty.
            </p>
          </div>
          <div className="p-4 rounded-xl border flex items-center justify-between" style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)' }}>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>Live class status</span>
              <h4 className="text-xs font-bold">No Live Cohorts Scheduled</h4>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>

      </div>

    </div>
  );
}
