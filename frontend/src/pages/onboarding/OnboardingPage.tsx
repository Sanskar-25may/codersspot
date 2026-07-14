import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingPage() {
  const { onboard, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<'STUDENT' | 'FACULTY'>('STUDENT');
  const [specialization, setSpecialization] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    if (!role) {
      setValidationError("Please select your account type.");
      return;
    }

    setIsLoading(true);
    try {
      await onboard({ role, specialization, bio });
      
      // Navigate dynamically based on role choice
      if (role === 'FACULTY') {
        navigate('/faculty', { replace: true });
      } else {
        navigate('/student', { replace: true });
      }
    } catch (err) {
      // Handled by Context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <div className="w-full max-w-xl p-8 rounded-3xl glass flex flex-col space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase" style={{ background: 'var(--accent-lighter)', color: 'var(--accent-primary)' }}>
            Step 2: Profile Onboarding
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight heading-font">
            Set Up Your Account
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Tell us about your learning goals or instructional expertise.
          </p>
        </div>

        {/* Error Banner */}
        {(error || validationError) && (
          <div className="p-4 rounded-xl border border-red-500/20 text-xs font-bold text-red-500" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
            {error || validationError}
          </div>
        )}

        <form onSubmit={handleOnboardSubmit} className="space-y-6">
          {/* Role Choice Cards */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Choose Your Account Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Student Option */}
              <div 
                onClick={() => setRole('STUDENT')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${role === 'STUDENT' ? 'shadow-lg border-violet-500' : ''}`}
                style={{ 
                  background: 'var(--bg-surface)', 
                  borderColor: role === 'STUDENT' ? 'var(--accent-primary)' : 'var(--border-soft)'
                }}
              >
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 text-xl font-bold">🎓</div>
                <h3 className="text-sm font-bold">Student Learner</h3>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Enroll in interactive courses, submit code assignments, and track skill gains.</p>
              </div>

              {/* Faculty Option */}
              <div 
                onClick={() => setRole('FACULTY')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${role === 'FACULTY' ? 'shadow-lg border-cyan-500' : ''}`}
                style={{ 
                  background: 'var(--bg-surface)', 
                  borderColor: role === 'FACULTY' ? 'var(--accent-cyan)' : 'var(--border-soft)'
                }}
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 text-xl font-bold">💼</div>
                <h3 className="text-sm font-bold">Faculty Instructor</h3>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Syllabus wizard, review homework grids, evaluate submissions, and hold cohort calls.</p>
              </div>

            </div>
          </div>

          {/* Specialization */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Area of Specialization
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer, ML Engineer, UI/UX Designer"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
              style={{ 
                borderColor: 'var(--border-med)', 
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Biography */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Short Biography
            </label>
            <textarea
              rows={4}
              placeholder="Describe your background, learning aims, or previous experience..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none"
              style={{ 
                borderColor: 'var(--border-med)', 
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 shadow-lg transition-all"
          >
            {isLoading ? "Saving Profile..." : "Complete Onboarding Setup"}
          </button>

        </form>

      </div>
    </div>
  );
}
