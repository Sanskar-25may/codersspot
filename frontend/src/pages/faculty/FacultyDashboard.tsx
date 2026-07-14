import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFacultyDashboard } from '../../services/courses';

export default function FacultyDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFacultyDashboard()
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
    courses_count: 0,
    enrolled_count: 0,
    revenue_mock: 0.00,
    courses: []
  };

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight heading-font">Faculty Dashboard</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Manage your courses, build curricula, and evaluate student homework.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/faculty/courses/create"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:opacity-95 transition-all"
          >
            Create Course Wizard
          </Link>
          <Link 
            to="/faculty/submissions"
            className="px-4 py-2.5 rounded-xl text-xs font-bold border transition-all"
            style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
          >
            Grading Queue
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">📘</span>
          <h3 className="text-2xl font-extrabold">{data.courses_count}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Created Courses</p>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">👨‍🎓</span>
          <h3 className="text-2xl font-extrabold">{data.enrolled_count}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Active Students</p>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl border glass card-hover space-y-2">
          <span className="text-2xl">💰</span>
          <h3 className="text-2xl font-extrabold">₹{data.revenue_mock.toLocaleString('en-IN')}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Instructor Revenue</p>
        </div>

      </div>

      {/* Courses List Table */}
      <div className="p-8 rounded-3xl border glass space-y-6">
        <h2 className="text-xl font-bold">My Courses Catalog</h2>
        
        {data.courses.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>You have not created any course modules yet.</p>
            <Link to="/faculty/courses/create" className="inline-block px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md">Create Your First Course</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-semibold">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-tertiary)' }}>
                  <th className="py-3 px-4 uppercase tracking-wider">Course Name</th>
                  <th className="py-3 px-4 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.courses.map((course: any) => (
                  <tr key={course.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all" style={{ borderColor: 'var(--border-soft)' }}>
                    <td className="py-4 px-4 font-bold">{course.title}</td>
                    <td className="py-4 px-4">₹{parseFloat(course.price).toLocaleString('en-IN')}</td>
                    <td className="py-4 px-4">
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          background: course.status === 'PUBLISHED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: course.status === 'PUBLISHED' ? '#10b981' : '#ef4444'
                        }}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link 
                        to={`/faculty/courses/builder/${course.id}`}
                        className="px-3 py-1.5 rounded-xl border font-bold hover:scale-[1.02] transition-all inline-block"
                        style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
                      >
                        Edit Syllabus
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
