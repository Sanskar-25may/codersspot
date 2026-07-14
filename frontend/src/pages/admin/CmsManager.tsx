import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPageContent, updatePageContent } from '../../services/cms';

export default function CmsManager() {
  const [headline, setHeadline] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [students, setStudents] = useState('');
  const [hikes, setHikes] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getPageContent('landing')
      .then((content: any) => {
        const layout = content || {};
        setHeadline(layout.headline || '');
        setSubtitle(layout.subtitle || '');
        setStudents(layout.students || '');
        setHikes(layout.hikes || '');
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const payload = {
        headline,
        subtitle,
        students,
        hikes
      };
      await updatePageContent('landing', payload);
      setMessage("Landing page content updated successfully!");
    } catch {
      setMessage("Failed to update layout configurations.");
    } finally {
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <div className="w-full max-w-2xl p-8 rounded-3xl glass flex flex-col space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border-soft)' }}>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-tertiary)' }}>CMS Site Editor</span>
            <h1 className="text-lg font-bold">Manage landing page configurations</h1>
          </div>
          <Link to="/admin" className="text-xs font-bold text-violet-500 hover:underline">
            Cancel
          </Link>
        </div>

        {message && (
          <div className="p-4 rounded-xl border border-emerald-500/20 text-xs font-bold text-emerald-500" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
            ✓ {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          
          {/* Headline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Hero Headline
            </label>
            <input
              type="text"
              placeholder="e.g. Build skills that ship real products."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
              style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Hero Subtext
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Master React components, Django REST APIs, and production VPS setups."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none"
              style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stat 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Total Students Copy
              </label>
              <input
                type="text"
                placeholder="e.g. 10,000+ Students"
                value={students}
                onChange={(e) => setStudents(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Average Placement Hike
              </label>
              <input
                type="text"
                placeholder="e.g. 98% Satisfaction"
                value={hikes}
                onChange={(e) => setHikes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all"
            >
              {saving ? "Saving CMS content..." : "Save layout edits"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
