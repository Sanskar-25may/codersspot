import React, { useState } from 'react';

interface CareerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  
  qualification: string;
  fieldOfStudy: string;
  gradYear: string;
  
  jobStatus: string;
  experienceYears: string;
  skills: string;
  
  preferredTrack: string;
  primaryGoal: string;
  commitment: string;
  
  github: string;
  linkedin: string;
  resumeUrl: string;
}

const initialFormData: CareerFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  qualification: '',
  fieldOfStudy: '',
  gradYear: '',
  jobStatus: '',
  experienceYears: '',
  skills: '',
  preferredTrack: '',
  primaryGoal: '',
  commitment: '',
  github: '',
  linkedin: '',
  resumeUrl: '',
};

export default function CareersPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CareerFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof CareerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.email.trim() !== '';
    }
    if (step === 2) {
      return formData.qualification !== '' && formData.fieldOfStudy.trim() !== '' && formData.gradYear.trim() !== '';
    }
    if (step === 3) {
      return formData.jobStatus !== '' && formData.experienceYears !== '';
    }
    if (step === 4) {
      return formData.preferredTrack !== '' && formData.primaryGoal.trim() !== '' && formData.commitment !== '';
    }
    return true; // Step 5 has optional social links
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col pt-24 dot-grid pb-20 justify-center items-center"
        style={{ background: 'transparent', color: 'var(--text-primary)' }}
      >
        <div
          className="rounded-[32px] p-8 border shadow-xl max-w-xl w-full text-center space-y-6"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
        >
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black heading-font">Application Submitted!</h2>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Thank you for filling out the career guidance form, <span className="text-indigo-400 font-bold">{formData.firstName}</span>.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              Our expert counselors are analyzing your profile goals. We will reach out to you at <span className="font-semibold">{formData.email}</span> within 24-48 hours to schedule a personalized Tech Career counseling call.
            </p>
          </div>

          <div className="pt-4 border-t flex flex-col items-center gap-3" style={{ borderColor: 'var(--border-soft)' }}>
            <button
              onClick={() => {
                setFormData(initialFormData);
                setStep(1);
                setSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = step * 20;

  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid pb-20"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      <section className="relative py-12 px-6 max-w-4xl mx-auto space-y-4 text-center w-full overflow-hidden">
        <h1 className="text-5xl font-extrabold tracking-tight heading-font">
          Join Our Team
        </h1>
        <p
          className="text-base font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Fill out the career guidance form below to explore opportunities with us.
        </p>
      </section>

      {/* Career Form Progress bar */}
      <section className="px-6 max-w-2xl mx-auto w-full space-y-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-400">
            <span>Step {step} of 5</span>
            <span>{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: 'var(--border-soft)' }}>
            <div 
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Wizard Form Cards container */}
        <form
          onSubmit={handleNext}
          className="rounded-[32px] p-8 border shadow-xl flex flex-col space-y-6"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-soft)',
          }}
        >
          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-5 text-left">
              <h2 className="text-xl font-black heading-font border-b pb-3" style={{ borderColor: 'var(--border-soft)' }}>
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder="John"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder="Doe"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="City, Country"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Educational Details */}
          {step === 2 && (
            <div className="space-y-5 text-left">
              <h2 className="text-xl font-black heading-font border-b pb-3" style={{ borderColor: 'var(--border-soft)' }}>
                Educational Background
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Highest Qualification *</label>
                <select
                  required
                  value={formData.qualification}
                  onChange={(e) => updateField('qualification', e.target.value)}
                  className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                >
                  <option value="" disabled>Select Qualification</option>
                  <option value="High School">High School / Senior Secondary</option>
                  <option value="Bachelor's Degree">Bachelor's Degree (B.Tech, BCA, B.Sc, etc.)</option>
                  <option value="Master's Degree">Master's Degree (M.Tech, MCA, M.Sc, etc.)</option>
                  <option value="Ph.D.">Ph.D. / Doctorate</option>
                  <option value="Other">Other Certificate / Diploma</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Field of Study *</label>
                  <input
                    type="text"
                    required
                    value={formData.fieldOfStudy}
                    onChange={(e) => updateField('fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science, Information Technology"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Graduation Year *</label>
                  <input
                    type="number"
                    required
                    value={formData.gradYear}
                    onChange={(e) => updateField('gradYear', e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Professional Experience */}
          {step === 3 && (
            <div className="space-y-5 text-left">
              <h2 className="text-xl font-black heading-font border-b pb-3" style={{ borderColor: 'var(--border-soft)' }}>
                Professional Experience
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Current Status *</label>
                  <select
                    required
                    value={formData.jobStatus}
                    onChange={(e) => updateField('jobStatus', e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="Student">Current Student</option>
                    <option value="Employed">Employed (Full-time / Part-time)</option>
                    <option value="Freelancer">Freelance Developer</option>
                    <option value="Unemployed">Not Currently Employed</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Years of Experience *</label>
                  <select
                    required
                    value={formData.experienceYears}
                    onChange={(e) => updateField('experienceYears', e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  >
                    <option value="" disabled>Select Experience</option>
                    <option value="0">Freshers / No Tech Experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1 to 3 years</option>
                    <option value="3-5">3 to 5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Key Tech Skills / Frameworks</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => updateField('skills', e.target.value)}
                  placeholder="e.g. React, Node.js, Python, Docker"
                  className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Goals & Time Commitments */}
          {step === 4 && (
            <div className="space-y-5 text-left">
              <h2 className="text-xl font-black heading-font border-b pb-3" style={{ borderColor: 'var(--border-soft)' }}>
                Goals & Interests
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Preferred Learning Track *</label>
                  <select
                    required
                    value={formData.preferredTrack}
                    onChange={(e) => updateField('preferredTrack', e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  >
                    <option value="" disabled>Select Track</option>
                    <option value="Frontend">Frontend Engineering (React, Next.js, UI/UX)</option>
                    <option value="Backend">Backend Systems (Scaling, Node, Go, DBs)</option>
                    <option value="FullStack">Full Stack Engineering (MERN, Next.js)</option>
                    <option value="DevOps">DevOps & Cloud Systems (AWS, Docker, Kubernetes)</option>
                    <option value="DataScience">Data Engineering & Applied ML</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Weekly Time Commitment *</label>
                  <select
                    required
                    value={formData.commitment}
                    onChange={(e) => updateField('commitment', e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  >
                    <option value="" disabled>Select Commitment</option>
                    <option value="5-10 hrs">5 - 10 hours/week (Part-time / Light)</option>
                    <option value="10-20 hrs">10 - 20 hours/week (Medium Pace)</option>
                    <option value="20+ hrs">20+ hours/week (Intensive / Cohort standard)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Primary Goal *</label>
                <input
                  type="text"
                  required
                  value={formData.primaryGoal}
                  onChange={(e) => updateField('primaryGoal', e.target.value)}
                  placeholder="e.g. Landing a job at a product-based tech startup, scaling system skills"
                  className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          )}

          {/* STEP 5: Resume & Social Links */}
          {step === 5 && (
            <div className="space-y-5 text-left">
              <h2 className="text-xl font-black heading-font border-b pb-3" style={{ borderColor: 'var(--border-soft)' }}>
                Resume & Profiles
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Paste Portfolio or Resume Drive Link</label>
                <input
                  type="url"
                  value={formData.resumeUrl}
                  onChange={(e) => updateField('resumeUrl', e.target.value)}
                  placeholder="https://drive.google.com/file/... or portfolio URL"
                  className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>GitHub Profile Link</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => updateField('github', e.target.value)}
                    placeholder="https://github.com/your-username"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>LinkedIn Profile Link</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full p-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2.5 rounded-xl text-xs font-bold border transition-all"
                style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={!isStepValid()}
              className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all"
            >
              {step === 5 ? 'Submit Application' : 'Continue'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
