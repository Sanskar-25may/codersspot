import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSubmissionDetails, gradeStudentSubmission } from '../../services/courses';

export default function GradingPortal() {
  const { submission_id } = useParams<{ submission_id: string }>();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Grading form inputs
  const [grade, setGrade] = useState('A+');
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (submission_id) {
      getSubmissionDetails(submission_id)
        .then((data) => {
          setSubmission(data);
          if (data.grade) setGrade(data.grade);
          if (data.feedback) setFeedback(data.feedback);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [submission_id]);

  const handleSubmitGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission_id) return;
    setError(null);
    setSaving(true);

    try {
      await gradeStudentSubmission(submission_id, { grade, feedback });
      navigate('/faculty/submissions');
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to submit evaluation details.");
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        <p className="text-sm font-medium">Homework submission metadata could not be fetched.</p>
        <Link to="/faculty/submissions" className="text-xs font-bold text-violet-500 hover:underline">Back to Queue</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <div className="w-full max-w-2xl p-8 rounded-3xl glass flex flex-col space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border-soft)' }}>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Grading Portal</span>
            <h1 className="text-lg font-bold">Evaluate Submission</h1>
          </div>
          <Link to="/faculty/submissions" className="text-xs font-bold text-violet-500 hover:underline">
            Cancel
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-xl border border-red-500/20 text-xs font-bold text-red-500" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
            ✗ {error}
          </div>
        )}

        {/* Student metadata panel */}
        <div className="p-6 rounded-2xl border space-y-4 text-xs" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Student Name</span>
              <p className="font-bold text-sm">{submission.student_name}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Student Email</span>
              <p className="font-medium text-gray-500">{submission.student_email}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Course Module</span>
              <p className="font-semibold">{submission.course_title}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Lesson Unit</span>
              <p className="font-semibold">{submission.lesson_title}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border-soft)' }}>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Submitted Assignment File</span>
            <div>
              <a 
                href={submission.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-violet-500 border border-violet-500/20 hover:bg-violet-500/5 transition-all"
              >
                📥 Open Assignment Artifact Link ➔
              </a>
            </div>
          </div>
        </div>

        {/* Grading Form */}
        <form onSubmit={handleSubmitGrade} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grade Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Grade Allocation
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <option value="A+">A+ (Outstanding)</option>
                <option value="A">A (Excellent)</option>
                <option value="B">B (Good)</option>
                <option value="C">C (Satisfactory)</option>
                <option value="F">F (Needs Resubmission)</option>
              </select>
            </div>
          </div>

          {/* Feedback details */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Faculty Feedback & Notes
            </label>
            <textarea
              rows={4}
              placeholder="Highlight areas of excellence or opportunities for optimization..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none"
              style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all"
            >
              {saving ? "Saving Grade..." : "Submit Homework Evaluation"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
