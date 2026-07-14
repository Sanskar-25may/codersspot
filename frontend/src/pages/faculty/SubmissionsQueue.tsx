import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFacultySubmissions } from '../../services/courses';

export default function SubmissionsQueue() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'GRADED'>('PENDING');
  const [isLoading, setIsLoading] = useState(true);

  const loadSubmissions = () => {
    setIsLoading(true);
    getFacultySubmissions(activeTab)
      .then((data) => {
        setSubmissions(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadSubmissions();
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight heading-font">Student Homework Submissions</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Review homework files, allocate grades, and provide feedback.</p>
        </div>
        <Link 
          to="/faculty" 
          className="text-xs font-bold text-violet-500 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl p-1 max-w-sm" style={{ background: 'var(--bg-surface)' }}>
        <button 
          onClick={() => setActiveTab('PENDING')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'PENDING' ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-md' : ''}`}
        >
          Pending Review
        </button>
        <button 
          onClick={() => setActiveTab('GRADED')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'GRADED' ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-md' : ''}`}
        >
          Evaluated
        </button>
      </div>

      {/* Queue Card Table */}
      <div className="p-8 rounded-3xl border glass space-y-6 flex-1">
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <span className="text-4xl">📬</span>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              No submissions found under this filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-semibold">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-tertiary)' }}>
                  <th className="py-3 px-4 uppercase tracking-wider">Student</th>
                  <th className="py-3 px-4 uppercase tracking-wider">Course Module</th>
                  <th className="py-3 px-4 uppercase tracking-wider">Lesson Target</th>
                  <th className="py-3 px-4 uppercase tracking-wider">Submitted</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-right">
                    {activeTab === 'PENDING' ? 'Action' : 'Grade'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub: any) => (
                  <tr key={sub.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all" style={{ borderColor: 'var(--border-soft)' }}>
                    <td className="py-4 px-4">
                      <div className="font-bold">{sub.student_name || 'Student'}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{sub.student_email}</div>
                    </td>
                    <td className="py-4 px-4">{sub.course_title}</td>
                    <td className="py-4 px-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>{sub.lesson_title}</td>
                    <td className="py-4 px-4 text-gray-400">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {activeTab === 'PENDING' ? (
                        <Link 
                          to={`/faculty/submissions/grade/${sub.id}`}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-95 shadow-md inline-block"
                        >
                          Review & Grade
                        </Link>
                      ) : (
                        <span className="font-bold text-sm text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
                          {sub.grade}
                        </span>
                      )}
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
