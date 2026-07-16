const STATS = [
  {
    value: '+67k',
    label: 'Average Salary Increase',
    desc: 'For students switching jobs',
  },
  {
    value: '98.2%',
    label: 'Placement Rate',
    desc: 'Within 6 months of graduation',
  },
  {
    value: '15+',
    label: 'Hiring Partners',
    desc: 'Top tech companies Nation wide',
  },
];

const PARTNERS = [
  'Google',
  'Amazon',
  'Microsoft',
  'Meta',
  'Netflix',
];

const ALUMNI = [
  {
    name: 'Student1',
    prev: 'Backend Engineer',
    now: 'Senior Backend Engineer @ Citius Tech Pvt. Ltd.',
    quote: 'CodersSpot helped me transition from a service-based company to a product-based giant.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Student2',
    prev: 'Software Engineer',
    now: 'Senior Software Engineer @ Globex Digital Solution Pvt. Ltd.',
    quote: 'The focus on System Design and advanced React concepts was exactly what I needed.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Amar Sahu',
    prev: 'Software Developer',
    now: 'Senior Software Engineer @ Techblocks and L&T',
    quote: 'The intense focus on system architecture helped me ace my design interviews effortlessly.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
];

const PARTNER_COLORS: Record<string, string> = {
  Google: '#4285F4',
  Amazon: '#FF9900',
  Microsoft: '#00BCF2',
  Meta: '#0668E1',
  Netflix: '#E50914',
};

export default function PlacementsPage() {
  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      {/* ── HERO ── */}
      <section className="relative py-24 px-6 max-w-4xl mx-auto space-y-6 text-center w-full overflow-hidden">

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
          Our Alumni Work At
        </h1>
        <p
          className="text-base font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Join thousands of engineers at top companies.
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
              {/* Profile Card Header */}
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg border" style={{ borderColor: 'var(--border-soft)' }}>
                  <img src={alumnus.avatar} alt={alumnus.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h4 className="text-lg font-bold heading-font">{alumnus.name}</h4>
              </div>

              {/* Before and After details */}
              <div className="space-y-4">
                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--text-tertiary)' }} className="font-bold">Before</span>
                    <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      {alumnus.prev}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white bg-indigo-600 flex-shrink-0 mt-0.5">
                      After
                    </span>
                    <span className="font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {alumnus.now}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4" style={{ borderColor: 'var(--border-soft)' }}>
                  <p
                    className="text-xs leading-relaxed italic"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    "{alumnus.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
