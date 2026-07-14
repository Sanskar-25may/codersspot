import { useState, useEffect } from 'react';
import { getPageContent } from '../../services/cms';

export default function AboutPage() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPageContent('about')
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

  const aboutData = content || {
    headline: "Bridging learning and engineering.",
    story: "CodersSpot started as a mission to make software development accessible, practical, and highly aligned with modern industry benchmarks.",
    values: [],
    team: []
  };

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* 1. HERO SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight heading-font">
          {aboutData.headline}
        </h1>
        <div className="border-l-4 pl-6 py-2 text-left max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ borderColor: 'var(--accent-primary)', color: 'var(--text-secondary)' }}>
          {aboutData.story}
        </div>
      </section>

      {/* 2. VALUES SECTION */}
      {aboutData.values && aboutData.values.length > 0 && (
        <section className="py-16 px-6" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)' }}>
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-center heading-font">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aboutData.values.map((val: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl border flex flex-col space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
                  <h3 className="text-sm font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">{val.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. TEAM DIRECTORY */}
      {aboutData.team && aboutData.team.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto space-y-12 flex-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-center heading-font">Our Leadership Directory</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {aboutData.team.map((member: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl glass card-hover flex flex-col items-center text-center space-y-4">
                
                {/* Circular Image Fallback frame */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-lg text-white" style={{ background: 'var(--bg-card)', color: 'var(--accent-primary)' }}>
                    {member.avatar}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold">{member.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                    {member.role}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
