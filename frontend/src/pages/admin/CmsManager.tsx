import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPageContent, updatePageContent } from '../../services/cms';

export default function CmsManager() {
  const [headlineNormal, setHeadlineNormal] = useState('');
  const [headlineBold, setHeadlineBold] = useState('');
  const [subtext, setSubtext] = useState('');
  const [students, setStudents] = useState('');
  const [hikes, setHikes] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getPageContent('landing')
      .then((content: any) => {
        const layout = content || {};
        setHeadlineNormal(layout.headline_normal || 'Build skills that');
        setHeadlineBold(layout.headline_bold || 'ship real products.');
        setSubtext(layout.subtext || 'Interactive project cohorts led by expert engineers from top tech organizations.');
        
        const stats = layout.stats || [];
        setStudents(stats[0]?.value || '10,000+');
        setHikes(stats[3]?.value || '96%');
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
        headline_normal: headlineNormal,
        headline_bold: headlineBold,
        subtext: subtext,
        stats: [
          { label: "Enrolled Students", value: students },
          { label: "Satisfied Learners", value: "98%" },
          { label: "Average Rating", value: "4.9★" },
          { label: "Salary Increase", value: hikes }
        ]
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
            <h1 className="text-lg font-bold">Manage Landing Page Configurations</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Headline Normal */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Headline (Normal Part)
              </label>
              <input
                type="text"
                placeholder="e.g. Build skills that"
                value={headlineNormal}
                onChange={(e) => setHeadlineNormal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Headline Bold */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Headline (Bold Shimmer Part)
              </label>
              <input
                type="text"
                placeholder="e.g. ship real products."
                value={headlineBold}
                onChange={(e) => setHeadlineBold(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          {/* Subtext */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Hero Subtext
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Interactive project cohorts led by expert engineers from top tech organizations."
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none"
              style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stat 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Students Count Stat Value
              </label>
              <input
                type="text"
                placeholder="e.g. 10,000+"
                value={students}
                onChange={(e) => setStudents(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Salary Hike Stat Value
              </label>
              <input
                type="text"
                placeholder="e.g. 96%"
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
              {saving ? "Saving CMS content..." : "Save Layout Edits"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
