import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPageContent } from '../../services/cms';

const DEFAULT_STATS = [
  { value: '10,000+', label: 'Students Trained' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '4.9★', label: 'Mentor Rating' },
  { value: '96%', label: 'Placement Hikes' },
];

const DEFAULT_FEATURES = [
  {
    title: 'Project-Based Learning',
    desc: 'We threw out the video-course model. Every module ends with a deployable project reviewed by working engineers.',
    colSpan: 'lg:col-span-2',
    icon: '🚀',
  },
  {
    title: 'Live Cohorts',
    desc: 'Weekly interactive code reviews and Q&A sessions with working engineers.',
    colSpan: '',
    icon: '🎯',
  },
  {
    title: 'Verified Credentials',
    desc: 'All certificates are cryptographically verified and linked to your GitHub profile.',
    colSpan: '',
    icon: '🏅',
  },
];

const TESTIMONIALS = [
  {
    name: 'Rohan Deshmukh',
    role: 'Frontend Dev',
    text: 'The project-based learning model helped me build actual confidence. I got a job offer within 3 weeks of graduating.',
    initial: 'R',
  },
  {
    name: 'Priya Nair',
    role: 'Data Analyst',
    text: 'Outstanding curriculum quality. The peer cohort reviews made me understand what clean code really means.',
    initial: 'P',
  },
  {
    name: 'Aman Verma',
    role: 'DevOps Engineer',
    text: 'Highly practical. Setting up CI/CD pipelines in the classroom was the game changer.',
    initial: 'A',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Choose Your Track',
    desc: 'Browse our curriculum library and pick the specialisation that aligns with your career goals.',
  },
  {
    num: '02',
    title: 'Build Real Projects',
    desc: 'Complete hands-on projects under the guidance of senior engineers. Ship code, not just exercises.',
  },
  {
    num: '03',
    title: 'Get Hired',
    desc: 'Leverage our placement network and verified credentials to land roles at top tech companies.',
  },
];

export default function LandingPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getPageContent('landing')
      .then((data) => setContent(data))
      .catch(() => {});
  }, []);

  const landingData = {
    headline_normal: content?.headline_normal || 'Build skills that',
    headline_bold: content?.headline_bold || 'ship real products.',
    subtext:
      content?.subtext ||
      "Project-based engineering courses taught by the industry's top 1%. Join 10,000+ developers building the future of software.",
    stats:
      content?.stats && content.stats.length > 0 ? content.stats : DEFAULT_STATS,
    features:
      content?.features && content.features.length > 0
        ? content.features
        : DEFAULT_FEATURES,
  };

  const marqueeCompanies =
    'Google • Microsoft • Amazon • Razorpay • Paytm • Cred • Flipkart • Meta • Netflix • Zepto';
  const marqueeStack =
    'React • Next.js • TypeScript • Node.js • PostgreSQL • Docker • AWS • Redis • TailwindCSS • GraphQL';

  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* ── HERO ── */}
      <section className="relative py-24 px-6 overflow-hidden flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-8 w-full">
        <div className="absolute -top-16 -right-16 w-[480px] h-[480px] rounded-full blur-[150px] opacity-20 bg-gradient-to-br from-indigo-500 to-purple-600 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-[480px] h-[480px] rounded-full blur-[150px] opacity-15 bg-gradient-to-tr from-cyan-500 to-indigo-500 pointer-events-none" />

        {/* Badge */}
        <div className="terminal-badge flex items-center gap-2">
          <span className="pulse-dot flex-shrink-0" />
          Spring Cohort Enrolling Now
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight heading-font max-w-4xl">
          {landingData.headline_normal}{' '}
          <span className="shimmer-text block sm:inline">
            {landingData.headline_bold}
          </span>
        </h1>

        <p
          className="text-base md:text-lg font-medium max-w-2xl leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {landingData.subtext}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/courses"
            className="px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:scale-[1.03] transition-all duration-200"
          >
            Explore Curriculums
          </Link>
          <Link
            to="/auth"
            className="px-7 py-3.5 rounded-xl text-sm font-bold border hover:opacity-80 transition-all duration-200"
            style={{ borderColor: 'var(--border-med)', background: 'var(--bg-card)' }}
          >
            Start for Free
          </Link>
          <a
            href="https://wa.me/917355259488?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20courses%20at%20CodersSpot."
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:scale-[1.03] transition-all duration-200 shadow-lg"
            style={{ background: '#25D366' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Enquire on WhatsApp
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/100?img=${i}`}
                alt={`User ${i}`}
                className="w-9 h-9 rounded-full border-2 object-cover"
                style={{ borderColor: 'var(--bg-base)' }}
              />
            ))}
          </div>
          <div className="text-left">
            <div className="text-amber-400 font-bold text-sm">★★★★★</div>
            <p className="text-[11px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
              4.9/5 from 2,400 reviews
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        className="border-y py-14 px-6"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {landingData.stats.map((stat: any, idx: number) => (
            <div key={idx} className="text-center space-y-1.5">
              <h3 className="text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent heading-font">
                {stat.value}
              </h3>
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-16 px-6 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2
            className="text-xs font-bold uppercase tracking-widest mono-font"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Engineers from top companies learn here
          </h2>
        </div>

        <div className="overflow-hidden relative mb-4">
          <div className="marquee-track">
            {[marqueeCompanies, marqueeCompanies].map((text, i) => (
              <span
                key={i}
                className="text-sm font-bold whitespace-nowrap pr-16 mono-font"
                style={{ color: 'var(--accent-green)' }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden relative">
          <div className="marquee-track-reverse">
            {[marqueeStack, marqueeStack].map((text, i) => (
              <span
                key={i}
                className="text-sm font-bold whitespace-nowrap pr-16 mono-font"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CODERSSPOT (BENTO) ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold tracking-tight heading-font">
            Why CodersSpot
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            A curriculum engineered around real deployments, code reviews, and production benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {DEFAULT_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl glass card-hover flex flex-col justify-between min-h-[220px] ${feature.colSpan}`}
            >
              <div className="space-y-4">
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="text-xl font-bold heading-font">{feature.title}</h3>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="lg:col-span-2 p-8 rounded-3xl glass card-hover flex flex-col md:flex-row items-center justify-between gap-6 min-h-[140px]"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.08) 100%)',
            }}
          >
            <h3 className="text-xl font-bold heading-font">
              Join 10,000+ developers today
            </h3>
            <div className="flex gap-3 flex-shrink-0 flex-wrap">
              <Link
                to="/courses"
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.03] transition-all duration-200"
              >
                Browse Courses
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-xl text-sm font-bold border hover:opacity-75 transition-all duration-200"
                style={{ borderColor: 'var(--border-med)' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        className="py-24 px-6 border-y"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-5xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold tracking-tight heading-font">
              How it works
            </h2>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Three steps from where you are to where you want to be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, idx) => (
              <div key={idx} className="p-8 rounded-3xl glass card-hover space-y-4">
                <div
                  className="text-5xl font-extrabold heading-font bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent"
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold tracking-tight heading-font">
            What our students say
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Real results from real developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass card-hover flex flex-col justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="text-amber-400 font-bold">★★★★★</div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  "{t.text}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-violet-500 to-cyan-500"
                >
                  {t.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{t.name}</h4>
                  <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-24 px-6 text-center border-t"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight heading-font">
            Ready to build the future?
          </h2>
          <p className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
            Join thousands of developers leveling up their careers.
          </p>
          <Link
            to="/auth"
            className="inline-block px-10 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-xl hover:scale-[1.03] transition-all duration-200"
          >
            Start Your Journey →
          </Link>
        </div>
      </section>
    </div>
  );
}
