import React, { useState } from 'react';
import { submitContactMessage } from '../../services/leads';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all required inputs.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await submitContactMessage({ name, email, subject, message });
      setSuccessMessage(response.message);
      
      // Clear fields on success
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Failed to submit message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* HERO HEADER */}
      <section className="py-16 px-6 max-w-4xl mx-auto space-y-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight heading-font">
          Contact Our Team
        </h1>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Have queries about curriculum tracks, payments, or placement services? Drop us a line.
        </p>
      </section>

      {/* FORM PANE */}
      <section className="py-12 px-6 max-w-xl mx-auto w-full flex-1">
        <div className="p-8 rounded-3xl glass flex flex-col space-y-6">
          
          {/* Success Banner */}
          {successMessage && (
            <div className="p-4 rounded-xl border border-emerald-500/20 text-xs font-bold text-emerald-500" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
              ✓ {successMessage}
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl border border-red-500/20 text-xs font-bold text-red-500" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
              ✗ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ 
                  borderColor: 'var(--border-med)', 
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ 
                  borderColor: 'var(--border-med)', 
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Subject Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ 
                  borderColor: 'var(--border-med)', 
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Curriculum & Cohorts">Curriculum & Cohorts</option>
                <option value="Corporate Partnership">Corporate Partnership</option>
                <option value="Billing Support">Billing Support</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Your Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your details here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
              {isLoading ? "Submitting Message..." : "Send Message"}
            </button>

          </form>

        </div>
      </section>

    </div>
  );
}
