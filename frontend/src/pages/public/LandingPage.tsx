import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPageContent } from '../../services/cms';

export default function LandingPage() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPageContent('landing')
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

  // Fallback defaults if content fails to load
  const landingData = content || {
    headline_normal: "Build skills that",
    headline_bold: "ship real products.",
    subtext: "Interactive project cohorts led by expert engineers from top tech organizations.",
    stats: [],
    features: []
  };

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-6 overflow-hidden flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-8">
        {/* Blur orb backgrounds */}
        <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 bg-gradient-to-br from-violet-600 to-cyan-400"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-cyan-600 to-violet-400"></div>

        {/* Feature badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)', color: 'var(--accent-primary)' }}>
          🚀 Interactive Project Cohorts
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight heading-font max-w-4xl">
          {landingData.headline_normal}{' '}
          <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
            {landingData.headline_bold}
          </span>
        </h1>

        <p className="text-sm md:text-base font-medium max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {landingData.subtext}
        </p>

        {/* CTAs */}
        <div className="flex gap-4">
          <Link 
            to="/auth" 
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 shadow-lg transition-all"
          >
            Get Started Free
          </Link>
          <Link 
            to="/courses" 
            className="px-6 py-3 rounded-xl text-sm font-bold border transition-all"
            style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      {landingData.stats && landingData.stats.length > 0 && (
        <section className="border-y py-12 px-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {landingData.stats.map((stat: any, idx: number) => (
              <div key={idx} className="text-center space-y-1">
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent heading-font">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. BENTO FEATURES GRID */}
      {landingData.features && landingData.features.length > 0 && (
        <section className="py-24 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight heading-font">How We Ship Real Builders</h2>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>A curriculum engineered around production, deployment, and scalability benchmarks.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {landingData.features.map((feature: any, idx: number) => (
              <div 
                key={idx} 
                className={`p-8 rounded-3xl border glass card-hover flex flex-col justify-between min-h-[220px] ${feature.col_span || ''}`}
                style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center font-bold text-sm text-violet-500">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {feature.desc}
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-violet-500 flex items-center gap-2 cursor-pointer hover:underline">
                  Learn more ➔
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
