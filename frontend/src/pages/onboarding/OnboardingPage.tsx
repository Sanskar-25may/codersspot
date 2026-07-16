import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingPage() {
  const { onboard, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form State
  const [role, setRole] = useState<'STUDENT' | 'FACULTY'>('STUDENT');
  const [lifeStage, setLifeStage] = useState('');
  const [organization, setOrganization] = useState('');
  const [degree, setDegree] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [techStack, setTechStack] = useState('');
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');

  const availableLanguages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese'];

  const handleNext = () => {
    setValidationError(null);
    clearError();

    if (step === 1 && !role) {
      setValidationError("Please select your account type.");
      return;
    }
    if (step === 2 && !lifeStage) {
      setValidationError("Please select your current status.");
      return;
    }
    if (step === 3) {
      if (!techStack.trim()) {
        setValidationError("Please provide your primary skills or tech stack.");
        return;
      }
      if (lifeStage !== 'Freelance Educator' && !organization.trim()) {
        setValidationError("Please provide your company or university name.");
        return;
      }
      if ((role === 'FACULTY' || lifeStage === 'Working Professional') && !experienceYears.trim()) {
        setValidationError("Please specify your years of experience.");
        return;
      }
      if (role === 'STUDENT' && lifeStage === 'Current Student' && !degree.trim()) {
        setValidationError("Please specify the degree you are pursuing.");
        return;
      }
      if (!country.trim() || !state.trim()) {
        setValidationError("Please provide your Country and State.");
        return;
      }
      if (languages.length === 0) {
        setValidationError("Please select at least one language.");
        return;
      }
    }

    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setValidationError(null);
    clearError();
    setStep((s) => s - 1);
  };

  const handleLanguageToggle = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter((l) => l !== lang));
    } else {
      setLanguages([...languages, lang]);
    }
  };

  const handleOnboardSubmit = async () => {
    setValidationError(null);
    clearError();
    setIsLoading(true);

    const payload = {
      role,
      lifeStage,
      organization,
      degree,
      experienceYears,
      techStack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
      bio,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      country,
      state,
      city,
      pincode,
      languages,
      avatarUrl,
    };

    try {
      await onboard(payload);
      
      // Navigate dynamically based on role choice
      if (role === 'FACULTY') {
        navigate('/faculty', { replace: true });
      } else {
        navigate('/student', { replace: true });
      }
    } catch (err) {
      // Handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    borderColor: 'var(--border-med)',
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
  };

  const labelStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24 pb-20" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
      <div className="w-full max-w-2xl p-8 rounded-3xl border flex flex-col space-y-6"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        
        {/* Progress Bar & Header */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="h-1.5 flex-1 rounded-full transition-all duration-300"
                style={{ 
                  background: i <= step ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))' : 'var(--border-soft)'
                }}
              />
            ))}
          </div>
          
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--accent-primary)' }}>
              Step {step} of 4: Setup Profile
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight heading-font">
              {step === 1 && "Choose Your Account Type"}
              {step === 2 && "Tell Us About Yourself"}
              {step === 3 && "Tell Us a Few More Details"}
              {step === 4 && "Add Your Profile Details"}
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {step === 1 && "How do you plan to use the CodersSpot platform?"}
              {step === 2 && "Which status description best matches your current life stage?"}
              {step === 3 && "Help us tailor your workspace and curriculum resources."}
              {step === 4 && "Add links to help fellow peer engineers connect with you."}
            </p>
          </div>
        </div>

        {/* Error Banner */}
        {(error || validationError) && (
          <div className="p-4 rounded-xl border border-red-500/20 text-xs font-bold text-red-500" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
            {error || validationError}
          </div>
        )}

        {/* STEP 1: CHOOSE ROLE */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Card */}
            <div 
              onClick={() => setRole('STUDENT')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:scale-[1.01] ${role === 'STUDENT' ? 'shadow-lg' : ''}`}
              style={{ 
                background: 'var(--bg-surface)', 
                borderColor: role === 'STUDENT' ? 'var(--accent-primary)' : 'var(--border-soft)'
              }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)' }}>
                🎓
              </div>
              <h3 className="text-lg font-bold heading-font">I am a Student</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I want to enroll in classes, practice programming, complete assignments, and track my skills.
              </p>
            </div>

            {/* Instructor Card */}
            <div 
              onClick={() => setRole('FACULTY')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:scale-[1.01] ${role === 'FACULTY' ? 'shadow-lg' : ''}`}
              style={{ 
                background: 'var(--bg-surface)', 
                borderColor: role === 'FACULTY' ? 'var(--accent-cyan)' : 'var(--border-soft)'
              }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: 'color-mix(in srgb, var(--accent-cyan) 10%, transparent)' }}>
                👨‍🏫
              </div>
              <h3 className="text-lg font-bold heading-font">I am an Instructor</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I want to craft code challenges, design course curriculums, and review student submissions.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: LIFE STAGE */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(role === 'FACULTY'
              ? ["Industry Professional", "Academic Professor", "Freelance Educator", "Subject Matter Expert"]
              : ["Current Student", "Working Professional", "Tech Enthusiast", "Business Owner"]
            ).map((stage) => (
              <div
                key={stage}
                onClick={() => setLifeStage(stage)}
                className="p-5 rounded-2xl border cursor-pointer text-center font-bold text-sm transition-all hover:scale-[1.01]"
                style={{
                  borderColor: lifeStage === stage ? 'var(--accent-primary)' : 'var(--border-soft)',
                  background: lifeStage === stage ? 'color-mix(in srgb, var(--accent-primary) 5%, transparent)' : 'var(--bg-surface)',
                  color: lifeStage === stage ? 'var(--accent-primary)' : 'var(--text-primary)'
                }}
              >
                {stage}
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: WORKSPACE DETAILS */}
        {step === 3 && (
          <div className="space-y-4 text-xs font-bold uppercase tracking-wider">
            
            {/* College / Organization */}
            {lifeStage !== 'Freelance Educator' && (
              <div className="space-y-1.5">
                <label style={labelStyle}>
                  {role === 'FACULTY' ? 'University / Institution Name' : 'College / University / Company'}
                </label>
                <input
                  type="text"
                  placeholder={role === 'FACULTY' ? 'e.g. MIT' : 'e.g. Stanford University or Google'}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                  style={inputStyle}
                />
              </div>
            )}

            {/* Degree for students */}
            {role === 'STUDENT' && lifeStage === 'Current Student' && (
              <div className="space-y-1.5">
                <label style={labelStyle}>Degree pursued</label>
                <input
                  type="text"
                  placeholder="e.g. B.S. Computer Science"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                  style={inputStyle}
                />
              </div>
            )}

            {/* Years of Experience */}
            {(role === 'FACULTY' || lifeStage === 'Working Professional' || lifeStage === 'Freelance Educator') && (
              <div className="space-y-1.5">
                <label style={labelStyle}>Years of Experience</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                  style={inputStyle}
                />
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-1.5">
              <label style={labelStyle}>Primary Tech Stack (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                style={inputStyle}
              />
            </div>

            {/* Location Group */}
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border-soft)' }}>
              <span className="text-[11px] font-extrabold uppercase tracking-wider block mb-3 text-zinc-400">Location Settings</span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label style={labelStyle}>Country</label>
                  <input
                    type="text"
                    placeholder="India"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                    style={inputStyle}
                  />
                </div>
                <div className="space-y-1.5">
                  <label style={labelStyle}>State</label>
                  <input
                    type="text"
                    placeholder="Uttar Pradesh"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="space-y-1.5">
                  <label style={labelStyle}>City</label>
                  <input
                    type="text"
                    placeholder="Lucknow"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                    style={inputStyle}
                  />
                </div>
                <div className="space-y-1.5">
                  <label style={labelStyle}>Pincode</label>
                  <input
                    type="text"
                    placeholder="226010"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Languages Selector */}
            <div className="pt-4 border-t space-y-2.5" style={{ borderColor: 'var(--border-soft)' }}>
              <label style={labelStyle} className="block mb-1">Preferred Communication Languages</label>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((lang) => {
                  const selected = languages.includes(lang);
                  return (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => handleLanguageToggle(lang)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border"
                      style={{
                        background: selected ? 'var(--accent-primary)' : 'var(--bg-surface)',
                        borderColor: selected ? 'var(--accent-primary)' : 'var(--border-soft)',
                        color: selected ? 'white' : 'var(--text-primary)'
                      }}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* STEP 4: SOCIALS & UPLOADS */}
        {step === 4 && (
          <div className="space-y-4 text-xs font-bold uppercase tracking-wider">
            
            {/* Mock Avatar Uploader */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border text-center" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface)' }}>
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border" style={{ borderColor: 'var(--border-soft)' }}>
                <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-zinc-400 block mb-1">Upload Photo</span>
                <input
                  type="text"
                  placeholder="Paste profile picture URL..."
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border text-[11px] font-semibold w-72 text-center focus:outline-none input-premium"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-1.5">
              <label style={labelStyle}>Short Bio</label>
              <textarea
                rows={3}
                placeholder="I am a software developer passionate about building scalable web applications..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none input-premium"
                style={inputStyle}
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-1.5">
              <label style={labelStyle}>LinkedIn URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                style={inputStyle}
              />
            </div>

            {/* GitHub */}
            <div className="space-y-1.5">
              <label style={labelStyle}>GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                style={inputStyle}
              />
            </div>

            {/* Portfolio Link for Faculty */}
            {role === 'FACULTY' && (
              <div className="space-y-1.5">
                <label style={labelStyle}>Portfolio Website</label>
                <input
                  type="url"
                  placeholder="https://mywebsite.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                  style={inputStyle}
                />
              </div>
            )}

          </div>
        )}

        {/* NAVIGATION FOOTER */}
        <div className="flex justify-between items-center pt-6 border-t mt-4" style={{ borderColor: 'var(--border-soft)' }}>
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase border hover:opacity-85 transition-all"
              style={{ borderColor: 'var(--border-med)', color: 'var(--text-secondary)' }}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:scale-[1.01] shadow-lg transition-all"
            >
              Continue
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleOnboardSubmit}
                disabled={isLoading}
                className="px-5 py-3 rounded-xl text-xs font-bold border hover:opacity-85 transition-all"
                style={{ borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}
              >
                Skip & Complete
              </button>
              <button
                onClick={handleOnboardSubmit}
                disabled={isLoading}
                className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:scale-[1.01] shadow-lg transition-all"
              >
                {isLoading ? "Saving..." : "Complete Setup"}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
