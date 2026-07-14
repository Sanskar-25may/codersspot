import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCourseDraft } from '../../services/courses';

export default function CourseWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (step === 1 && !title) {
      setError("Please fill in the course title.");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await createCourseDraft({ title, description, price });
      const newCourseId = response.course.id;
      // Redirect directly to the dynamic curriculum builder for this course
      navigate(`/faculty/courses/builder/${newCourseId}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create course draft.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <div className="w-full max-w-xl p-8 rounded-3xl glass flex flex-col space-y-6">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider border-b pb-4" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}>
          <span>Create Course Wizard</span>
          <div className="flex gap-2">
            <span className={step >= 1 ? 'text-violet-500' : ''}>1. Info</span>
            <span>➔</span>
            <span className={step >= 2 ? 'text-violet-500' : ''}>2. Pricing</span>
            <span>➔</span>
            <span className={step >= 3 ? 'text-violet-500' : ''}>3. Review</span>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl border border-red-500/20 text-xs font-bold text-red-500" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. System Design & Architectural Scale"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Syllabus Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the learning objectives, pre-requisites, and targets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none"
                  style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Pricing */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Course Pricing (in INR)
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="e.g. 4999"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Review summary */}
          {step === 3 && (
            <div className="p-6 rounded-2xl border space-y-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>Title</span>
                <h3 className="text-sm font-bold">{title}</h3>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>Price</span>
                <h3 className="text-sm font-bold">₹{price.toLocaleString('en-IN')}</h3>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>Curriculum Status</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  DRAFT (Pending Admin Review)
                </span>
              </div>
            </div>
          )}

          {/* Wizards navigation controls */}
          <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
              >
                ➔ Back
              </button>
            ) : (
              <Link to="/faculty" className="text-xs font-bold text-violet-500 hover:underline">
                Cancel
              </Link>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all"
              >
                Continue ➔
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all"
              >
                {isLoading ? "Saving Draft..." : "Confirm & Create Draft"}
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
