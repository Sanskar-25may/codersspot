import React, { useState } from 'react';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Course Questions',
  'Technical Support',
  'Other',
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save to localStorage as contact_leads
    try {
      const existing = JSON.parse(localStorage.getItem('contact_leads') || '[]');
      existing.push({ ...form, submittedAt: new Date().toISOString() });
      localStorage.setItem('contact_leads', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    // Simulate a short delay then show success
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
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
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      <section className="relative py-20 px-6 max-w-6xl mx-auto w-full flex-1">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT — Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight heading-font">
                Get in Touch
              </h1>
              <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We'd love to hear from you.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border mt-1"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>Email us</h4>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Our friendly team is here to help.</p>
                  <a
                    href="mailto:support@codersspot.com"
                    className="text-sm font-bold hover:underline block mt-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    support@codersspot.com
                  </a>
                </div>
              </div>

              {/* Office/Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border mt-1"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>Office</h4>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Come say hello at our HQ.</p>
                  <p className="text-xs font-semibold leading-relaxed max-w-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                    7ES8A, Mani CasaDona, Newtown, 11F, 04, Street Number 372, Action Area I, IIF, Newtown, Kolkata, 700160
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div
            className="p-8 rounded-[32px] border flex flex-col space-y-6"
            style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-emerald-500/10">
                  ✓
                </div>
                <h3 className="text-xl font-bold heading-font">Message Received!</h3>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Thank you! We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2.5 rounded-xl text-xs font-bold border hover:opacity-75 transition-all"
                  style={{ borderColor: 'var(--border-med)' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* First Name & Last Name Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold" style={labelStyle}>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all input-premium"
                      style={inputStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold" style={labelStyle}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all input-premium"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold" style={labelStyle}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all input-premium"
                      style={inputStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold" style={labelStyle}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all input-premium"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-bold" style={labelStyle}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all input-premium"
                    style={inputStyle}
                  >
                    <option value="" disabled>Select a topic...</option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-bold" style={labelStyle}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all resize-none input-premium"
                    style={inputStyle}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.01] shadow-lg transition-all duration-200 disabled:opacity-60"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
