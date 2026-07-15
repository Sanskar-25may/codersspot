import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPageContent } from '../../services/cms';

const DEFAULT_STATS = [
  { value: '10,000+', label: 'Students Trained' },
  { value: '98%',     label: 'Satisfaction Rate' },
  { value: '4.9★',   label: 'Mentor Rating' },
  { value: '96%',    label: 'Placement Hikes' },
];

const DEFAULT_FEATURES = [
  { title: 'Project-Based Learning', desc: 'We threw out the video-course model. Every module ends with a deployable project reviewed by working engineers.', colSpan: 'sm:col-span-2 lg:col-span-2', icon: '🚀' },
  { title: 'Live Cohorts',           desc: 'Weekly interactive code reviews and Q&A sessions with working engineers.',                                           colSpan: '',                          icon: '🎯' },
  { title: 'Verified Credentials',   desc: 'All certificates are cryptographically verified and linked to your GitHub profile.',                                  colSpan: '',                          icon: '🏅' },
];

const TESTIMONIALS = [
  { name: 'Rohan Deshmukh', role: 'Frontend Dev',      text: 'The project-based learning model helped me build actual confidence. I got a job offer within 3 weeks of graduating.', initial: 'R' },
  { name: 'Priya Nair',     role: 'Data Analyst',       text: 'Outstanding curriculum quality. The peer cohort reviews made me understand what clean code really means.',            initial: 'P' },
  { name: 'Aman Verma',     role: 'DevOps Engineer',    text: 'Highly practical. Setting up CI/CD pipelines in the classroom was the game changer.',                                  initial: 'A' },
];

const STEPS = [
  { num: '01', title: 'Choose Your Track',  desc: 'Browse our curriculum library and pick the specialisation that aligns with your career goals.' },
  { num: '02', title: 'Build Real Projects', desc: 'Complete hands-on projects under the guidance of senior engineers. Ship code, not just exercises.' },
  { num: '03', title: 'Get Hired',          desc: 'Leverage our placement network and verified credentials to land roles at top tech companies.' },
];

export default function LandingPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getPageContent('landing').then((d) => setContent(d)).catch(() => {});
  }, []);

  const landingData = {
    headline_normal: content?.headline_normal || 'Build skills that',
    headline_bold:   content?.headline_bold   || 'ship real products.',
    subtext:         content?.subtext         || "Project-based engineering courses taught by the industry's top 1%. Join 10,000+ developers building the future of software.",
    stats:    content?.stats?.length    > 0 ? content.stats    : DEFAULT_STATS,
    features: content?.features?.length > 0 ? content.features : DEFAULT_FEATURES,
  };

  const marqueeCompanies = 'Google • Microsoft • Amazon • Razorpay • Paytm • Cred • Flipkart • Meta • Netflix • Zepto';
  const marqueeStack     = 'React • Next.js • TypeScript • Node.js • PostgreSQL • Docker • AWS • Redis • TailwindCSS • GraphQL';

  return (
    <div className="min-h-screen flex flex-col" style={{ color: 'var(--text-primary)' }}>

      {/* ─── HERO ─── */}
      <section className="relative section-pad overflow-hidden" style={{ paddingTop: 'clamp(5rem, 12vw, 8rem)' }}>
        <div className="container-fluid flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
            {/* Gradient pill badge — matches glass design */}
            <div className="hero-badge">
              <span className="pulse-dot" />
              Spring Cohort Enrolling Now
            </div>

            <h1 className="text-fluid-hero font-extrabold tracking-tight leading-[1.08] heading-font w-full">
              {landingData.headline_normal}{' '}
              <span className="shimmer-text">{landingData.headline_bold}</span>
            </h1>

            <p className="text-fluid-md font-medium max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {landingData.subtext}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/courses"
                className="btn-glow px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.03] transition-all duration-200"
                style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}
              >
                Explore Curriculums
              </Link>
              <Link
                to="/auth"
                className="px-6 py-3 rounded-xl font-bold border hover:opacity-80 transition-all duration-200"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-card)', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}
              >
                Start for Free
              </Link>
              <a
                href="https://wa.me/917355259488?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20courses%20at%20CodersSpot."
                target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.03] transition-all duration-200 shadow-lg border"
                style={{
                  background: 'color-mix(in srgb, #25D366 15%, transparent)',
                  borderColor: '#25D366',
                  color: '#25D366',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/80?img=${i}`} alt={`User ${i}`}
                    className="rounded-full border-2 object-cover"
                    style={{ width:'clamp(28px,4vw,36px)', height:'clamp(28px,4vw,36px)', borderColor:'var(--bg-base)' }} />
                ))}
              </div>
              <div className="text-left">
                <div className="text-amber-400 font-bold" style={{ fontSize:'clamp(0.7rem,1.2vw,0.85rem)' }}>★★★★★</div>
                <p className="font-semibold" style={{ color:'var(--text-secondary)', fontSize:'clamp(0.6rem,0.9vw,0.7rem)' }}>4.9/5 from 2,400 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="border-y" style={{ background:'color-mix(in srgb, var(--bg-card) 85%, transparent)', borderColor:'var(--border-soft)' }}>
        <div className="container-fluid section-pad grid grid-cols-2 sm:grid-cols-4 gap-6">
          {landingData.stats.map((stat: any, idx: number) => (
            <div
              key={idx}
              className="text-center space-y-1"
            >
              <h3 className="font-extrabold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent heading-font"
                  style={{ fontSize:'clamp(1.6rem,4vw,2.5rem)' }}>
                {stat.value}
              </h3>
              <p className="font-bold uppercase tracking-wider"
                 style={{ color:'var(--text-tertiary)', fontSize:'clamp(0.58rem,0.85vw,0.68rem)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section
        className="overflow-hidden section-pad"
        style={{ background:'transparent' }}
      >
        <div className="container-fluid text-center mb-8">
          <p className="font-bold uppercase tracking-widest mono-font"
             style={{ color:'var(--text-tertiary)', fontSize:'clamp(0.58rem,0.85vw,0.68rem)' }}>
            Engineers from top companies learn here
          </p>
        </div>
        <div className="overflow-hidden mb-4">
          <div className="marquee-track">
            {[marqueeCompanies, marqueeCompanies].map((text, i) => (
              <span key={i} className="font-bold whitespace-nowrap pr-12 mono-font"
                    style={{ color:'var(--accent-green)', fontSize:'clamp(0.75rem,1.2vw,0.9rem)' }}>
                {text}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse">
            {[marqueeStack, marqueeStack].map((text, i) => (
              <span key={i} className="font-bold whitespace-nowrap pr-12 mono-font"
                    style={{ color:'var(--text-tertiary)', fontSize:'clamp(0.75rem,1.2vw,0.9rem)' }}>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CODERSSPOT ─── */}
      <section className="section-pad">
        <div className="container-fluid space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-fluid-xl font-extrabold tracking-tight heading-font">Why CodersSpot</h2>
            <p className="text-fluid-sm font-medium max-w-xl mx-auto" style={{ color:'var(--text-secondary)' }}>
              A curriculum engineered around real deployments, code reviews, and production benchmarks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEFAULT_FEATURES.map((feature, idx) => (
              <div key={idx}
                className="p-6 rounded-2xl glass card-hover flex flex-col gap-3"
                style={{ minHeight:'clamp(150px,18vw,200px)' }}
              >
                <div style={{ fontSize:'clamp(1.5rem,2.5vw,2rem)' }}>{feature.icon}</div>
                <h3 className="font-bold heading-font" style={{ fontSize:'clamp(0.9rem,1.4vw,1.1rem)' }}>{feature.title}</h3>
                <p className="font-medium leading-relaxed" style={{ color:'var(--text-secondary)', fontSize:'clamp(0.78rem,1vw,0.88rem)' }}>{feature.desc}</p>
              </div>
            ))}
            {/* Inline CTA card */}
            <div className="sm:col-span-2 p-6 rounded-2xl glass card-hover flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background:'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.07) 100%)' }}
            >
              <h3 className="font-bold heading-font" style={{ fontSize:'clamp(0.9rem,1.4vw,1.1rem)' }}>Join 10,000+ developers today</h3>
              <div className="flex gap-3 flex-wrap flex-shrink-0">
                <Link to="/courses" className="px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02] transition-all"
                  style={{ fontSize:'clamp(0.72rem,1.1vw,0.82rem)' }}>Browse Courses</Link>
                <Link to="/contact" className="px-4 py-2 rounded-xl font-bold border hover:opacity-75 transition-all"
                  style={{ borderColor:'var(--border-med)', fontSize:'clamp(0.72rem,1.1vw,0.82rem)' }}>Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-pad border-y"
        style={{ background:'color-mix(in srgb, var(--bg-card) 80%, transparent)', borderColor:'var(--border-soft)' }}>
        <div className="container-fluid space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-fluid-xl font-extrabold tracking-tight heading-font">How it works</h2>
            <p className="text-fluid-sm font-medium" style={{ color:'var(--text-secondary)' }}>Three steps from where you are to where you want to be.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {STEPS.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass card-hover space-y-3">
                <div className="font-extrabold heading-font bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent"
                     style={{ fontSize:'clamp(2rem,5vw,3.5rem)' }}>
                  {step.num}
                </div>
                <h3 className="font-bold" style={{ fontSize:'clamp(0.9rem,1.4vw,1.05rem)' }}>{step.title}</h3>
                <p className="leading-relaxed" style={{ color:'var(--text-secondary)', fontSize:'clamp(0.78rem,1vw,0.88rem)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-pad">
        <div className="container-fluid space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-fluid-xl font-extrabold tracking-tight heading-font">What our students say</h2>
            <p className="text-fluid-sm font-medium" style={{ color:'var(--text-secondary)' }}>Real results from real developers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass card-hover flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <div className="text-amber-400 font-bold" style={{ fontSize:'clamp(0.78rem,1.2vw,0.95rem)' }}>★★★★★</div>
                  <p className="leading-relaxed" style={{ color:'var(--text-secondary)', fontSize:'clamp(0.78rem,1vw,0.88rem)' }}>"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-violet-500 to-cyan-500 flex-shrink-0"
                    style={{ width:'clamp(30px,4vw,38px)', height:'clamp(30px,4vw,38px)', fontSize:'clamp(0.65rem,1vw,0.8rem)' }}>
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ fontSize:'clamp(0.78rem,1.1vw,0.88rem)' }}>{t.name}</h4>
                    <p style={{ color:'var(--text-tertiary)', fontSize:'clamp(0.62rem,0.9vw,0.72rem)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section-pad border-t text-center"
        style={{ background:'color-mix(in srgb, var(--bg-card) 80%, transparent)', borderColor:'var(--border-soft)' }}>
        <div className="container-fluid">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-fluid-xl font-extrabold tracking-tight heading-font">Ready to build the future?</h2>
            <p className="text-fluid-md font-medium" style={{ color:'var(--text-secondary)' }}>
              Join thousands of developers leveling up their careers.
            </p>
            <Link to="/auth"
              className="btn-glow inline-block px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.03] transition-all duration-200"
              style={{ fontSize:'clamp(0.85rem,1.5vw,1rem)' }}>
              Start Your Journey →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
