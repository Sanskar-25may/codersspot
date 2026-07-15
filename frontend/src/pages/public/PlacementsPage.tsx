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
                className="group h-16 rounded-2xl border flex items-center justify-center font-bold text-sm tracking-wide cursor-default transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-soft)',
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    PARTNER_COLORS[partner] + '22';
                  (e.currentTarget as HTMLElement).style.borderColor =
                    PARTNER_COLORS[partner] + '66';
                  (e.currentTarget as HTMLElement).style.color = PARTNER_COLORS[partner];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-soft)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                {partner}
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
