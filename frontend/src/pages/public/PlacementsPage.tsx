import { useState, useEffect } from 'react';
import { getPageContent } from '../../services/cms';

export default function PlacementsPage() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPageContent('placements')
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  const placementData = content || {
    headline: "Our alumni ship code at top companies.",
    stats: [],
    partners: []
  };

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* 1. HERO SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)', color: 'var(--accent-cyan)' }}>
          💼 Verified Career Hires
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight heading-font">
          {placementData.headline}
        </h1>
      </section>

      {/* 2. STATS */}
      {placementData.stats && placementData.stats.length > 0 && (
        <section className="py-12 px-6 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placementData.stats.map((stat: any, idx: number) => (
              <div key={idx} className="p-8 rounded-2xl glass card-hover text-center space-y-2">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent heading-font">
                  {stat.value}
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. PARTNERS */}
      {placementData.partners && placementData.partners.length > 0 && (
        <section className="py-20 px-6 border-t flex-1" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-center heading-font">Active Hiring Network</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {placementData.partners.map((partner: string, idx: number) => (
                <div key={idx} className="h-16 rounded-xl border flex items-center justify-center font-bold text-sm tracking-wide transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}>
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
