import { Link } from 'react-router-dom';

const VALUES = [
  {
    title: 'Ship Over Read',
    desc: 'Theory is useless without practice. We prioritize building over watching.',
  },
  {
    title: 'Radical Candor',
    desc: 'Code reviews shouldn\'t be nice; they should be honest and constructive.',
  },
  {
    title: 'Skin in the Game',
    desc: 'Our instructors actively work in the industry. No career academics.',
  },
  {
    title: 'Community First',
    desc: 'Your network is your net worth. We foster deep peer relationships.',
  },
];

const TEAM = [
  {
    name: 'Ashutosh Pandey',
    role: 'Founder & Lead Instructor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Naman Sharma',
    role: 'Devops Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Amit Dwivedi',
    role: 'Senior Instructor (Advance Java)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Pankaj Hasmukh',
    role: 'Front-end Lead JavaScript with React/Angular',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Vikas Sharma',
    role: 'Instructor (UI/UX)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Anoop Bopanna',
    role: 'Gen AI Developer',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Shashwat Shukla',
    role: 'Database Engineer',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80',
  }
];

export default function AboutPage() {
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
            color: 'var(--accent-primary)',
          }}
        >
          🏢 Our Story
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight heading-font">
          About <span className="shimmer-text">CodersSpot</span>
        </h1>
        <p
          className="text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          We're on a mission to bridge the gap between academic theory and production reality.
        </p>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight heading-font">
              The Problem We Saw
            </h2>
            <div
              className="border-l-4 pl-6 py-3 text-sm md:text-base leading-relaxed"
              style={{
                borderColor: 'var(--accent-primary)',
                color: 'var(--text-secondary)',
              }}
            >
              Most coding bootcamps teach you syntax. Most universities teach you theory. Neither
              prepares you to write production code that ships to millions of users. We saw
              engineers graduate from top programs and still struggle on their first real job.
              CodersSpot was built to fix that — a curriculum engineered around real deployments,
              code reviews, and production benchmarks.
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES GRID ── */}
      <section
        className="py-20 px-6 border-y"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold tracking-tight heading-font">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass card-hover flex flex-col space-y-4"
              >
                {/* Number Badge */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white bg-indigo-600">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {val.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full space-y-14">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold tracking-tight heading-font">
            The Team Behind CodersSpot
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {TEAM.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass card-hover flex flex-col items-center text-center space-y-4 w-full sm:w-[220px]"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border border-soft">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-bold">{member.name}</h3>
                <p
                  className="text-[10px] leading-snug font-medium uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        className="py-20 px-6 text-center border-t"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-xl mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold tracking-tight heading-font">
            Want to join our team?
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            We're always looking for exceptional engineers who want to teach the next generation.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:scale-[1.03] transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
