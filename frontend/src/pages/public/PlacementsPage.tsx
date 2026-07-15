const STATS = [
  {
    value: '93%',
    label: 'Job Offer Rate',
    desc: 'of graduates receive a job offer within 90 days',
  },
  {
    value: '62%',
    label: 'Average Hike',
    desc: 'average salary increase after completing our programs',
  },
  {
    value: '44 LPA',
    label: 'Top Package',
    desc: 'highest salary package received by a CodersSpot graduate',
  },
];

const PARTNERS = [
  'Google',
  'Microsoft',
  'Amazon',
  'Razorpay',
  'Paytm',
  'Cred',
  'Flipkart',
  'Meta',
  'Netflix',
  'Zepto',
];

const ALUMNI = [
  {
    name: 'Rohan D.',
    prev: 'Junior PHP Dev',
    now: 'Senior React Engineer @ Razorpay',
    quote:
      'The curriculum is exactly what the industry needs. I went from tutorial hell to production codebases in 3 months.',
    initial: 'R',
  },
  {
    name: 'Priya N.',
    prev: 'Data Entry Analyst',
    now: 'Data Engineer @ Google',
    quote:
      'The SQL and data pipeline modules were the best I\'ve ever seen. I got promoted twice in 8 months.',
    initial: 'P',
  },
  {
    name: 'Aman V.',
    prev: 'IT Support',
    now: 'DevOps Engineer @ Amazon',
    quote:
      'I learned more in 3 months at CodersSpot than in 3 years of self-study.',
    initial: 'A',
  },
];

const PARTNER_COLORS: Record<string, string> = {
  Google: '#4285F4',
  Microsoft: '#00BCF2',
  Amazon: '#FF9900',
  Razorpay: '#528FF0',
  Paytm: '#002970',
  Cred: '#1C1C1E',
  Flipkart: '#2874F0',
  Meta: '#0668E1',
  Netflix: '#E50914',
  Zepto: '#8A2BE2',
};

function BrandLogo({ name }: { name: string }) {
  switch (name) {
    case 'Google':
      return (
        <div className="flex items-center gap-0.5 font-bold text-base select-none">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </div>
      );
    case 'Microsoft':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <div className="grid grid-cols-2 gap-[1px] w-[12px] h-[12px]">
            <div className="bg-[#F25022]"></div>
            <div className="bg-[#7FBA00]"></div>
            <div className="bg-[#00A4EF]"></div>
            <div className="bg-[#FFB900]"></div>
          </div>
          <span className="font-semibold text-xs text-[#5E5E5E] dark:text-[#E6EDF3] tracking-tight">Microsoft</span>
        </div>
      );
    case 'Meta':
      return (
        <div className="flex items-center gap-1 select-none">
          <svg className="w-4.5 h-4.5 text-[#0668E1]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.14 8.78c-1.12 0-2.18.57-2.92 1.48a7.8 7.8 0 00-2.93-1.48c-2.31-.38-4.52.88-5.36 3.06a4.7 4.7 0 002.32 5.92c2.09 1.15 4.67.58 6.09-1.34 1.42 1.92 4 2.49 6.09 1.34a4.7 4.7 0 002.32-5.92c-.84-2.18-3.05-3.44-5.36-3.06m-6.49 5.86c-.95 1.16-2.6 1.4-3.83.56a2.82 2.82 0 01-1.33-3.4c.48-1.25 1.76-1.97 3.08-1.74a4.23 4.23 0 012.08 1.17c-.12.98.05 1.98-.56 2.85m8.11 0c-.61-.87-.44-1.87-.56-2.85a4.23 4.23 0 012.08-1.17c1.32-.23 2.6.49 3.08 1.74a2.82 2.82 0 01-1.33 3.4c-1.23.84-2.88.6-3.83-.56"/>
          </svg>
          <span className="font-semibold text-xs tracking-tight text-[#0668E1] dark:text-[#E6EDF3]">Meta</span>
        </div>
      );
    case 'Amazon':
      return (
        <div className="flex flex-col items-center select-none pt-0.5">
          <span className="font-bold text-xs tracking-tight text-black dark:text-white leading-none">amazon</span>
          <svg viewBox="0 0 100 25" className="w-8 h-2 text-[#FF9900]" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
            <path d="M 10,5 Q 50,22 90,5" />
            <polyline points="80,2 90,5 83,14" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'Netflix':
      return (
        <span className="font-black text-xs tracking-widest text-[#E50914] uppercase select-none">
          Netflix
        </span>
      );
    case 'Razorpay':
      return (
        <div className="flex items-center gap-1 font-bold text-xs text-[#0B3E91] dark:text-[#528FF0] select-none">
          <svg className="w-3.5 h-3.5 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.5 19h19l-7-14h-5z"/>
          </svg>
          Razorpay
        </div>
      );
    case 'Paytm':
      return (
        <div className="font-extrabold text-xs text-[#002970] dark:text-[#00B9F5] select-none">
          pay<span className="text-[#00B9F5]">tm</span>
        </div>
      );
    case 'Cred':
      return (
        <span className="font-mono tracking-widest text-[10px] font-bold text-black dark:text-white uppercase select-none">
          CRED
        </span>
      );
    case 'Flipkart':
      return (
        <div className="flex items-center gap-0.5 font-bold italic text-xs text-[#2874F0] dark:text-[#FFE500] select-none">
          <span className="text-blue-500">Flip</span>
          <span className="text-[#FFE500] dark:text-white">kart</span>
        </div>
      );
    case 'Zepto':
      return (
        <div className="px-2 py-0.5 rounded bg-[#3B0066] text-[#FF4500] font-black text-[10px] tracking-tight italic select-none">
          zepto
        </div>
      );
    default:
      return <span style={{ color: 'var(--text-secondary)' }}>{name}</span>;
  }
}

export default function PlacementsPage() {
  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      {/* ── HERO ── */}
      <section className="relative py-24 px-6 max-w-4xl mx-auto space-y-6 text-center w-full overflow-hidden">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[140px] opacity-15 bg-gradient-to-br from-indigo-500 to-cyan-500 pointer-events-none" />

        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-soft)',
            color: 'var(--accent-cyan)',
          }}
        >
          🏆 Career Outcomes
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight heading-font">
          Where our <span className="shimmer-text">alumni work</span>
        </h1>
        <p
          className="text-base font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          CodersSpot graduates don't just pass interviews; they hit the ground running on day one.
        </p>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-10 rounded-3xl glass card-hover text-center space-y-3"
            >
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent heading-font">
                {stat.value}
              </h2>
              <p className="text-sm font-bold">{stat.label}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HIRING PARTNERS ── */}
      <section
        className="py-20 px-6 border-y"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold tracking-tight heading-font">
              Hiring Partners
            </h2>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Where our alumni get placed.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="group h-16 rounded-2xl border flex items-center justify-center font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-sm"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-soft)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    PARTNER_COLORS[partner] + '12';
                  (e.currentTarget as HTMLElement).style.borderColor =
                    PARTNER_COLORS[partner] + '44';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-soft)';
                }}
              >
                <BrandLogo name={partner} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALUMNI SPOTLIGHTS ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold tracking-tight heading-font">
            Alumni Spotlights
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Real career transformations from our graduates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALUMNI.map((alumnus, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass card-hover flex flex-col justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="text-amber-400 font-bold">★★★★★</div>
                <p
                  className="text-sm leading-relaxed italic"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  "{alumnus.quote}"
                </p>
              </div>

              <div className="space-y-3 border-t pt-4" style={{ borderColor: 'var(--border-soft)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-violet-500 to-cyan-500 flex-shrink-0">
                    {alumnus.initial}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{alumnus.name}</h4>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--text-tertiary)' }}>Before:</span>
                    <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      {alumnus.prev}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--text-tertiary)' }}>Now:</span>
                    <span
                      className="font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent"
                    >
                      {alumnus.now}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
