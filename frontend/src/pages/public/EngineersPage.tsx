import { useParams, Link } from 'react-router-dom';

const ENGINEERS = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Senior Software Engineer',
    initial: 'S',
    biography: "Sarah hasn't added a detailed biography yet, but their code speaks for itself. Check out the courses they teach below.",
    teaches: ['Full Stack React & Next.js', 'UI/UX for Developers'],
    courses: [
      { title: 'Full Stack React & Next.js', desc: 'Master modern frontend development.' },
      { title: 'UI/UX for Developers', desc: 'Design beautiful interfaces.' }
    ]
  },
  {
    id: 'vikram-malhotra',
    name: 'Vikram Malhotra',
    role: 'Principal Systems Engineer',
    initial: 'V',
    biography: "Vikram is a distributed systems veteran who formerly scaled search indexing backends at Amazon. Check out the courses they teach below.",
    teaches: ['System Design & Scale'],
    courses: [
      { title: 'System Design & Scale', desc: 'Master distributed architectures and scaling.' }
    ]
  },
  {
    id: 'ananya-sharma',
    name: 'Ananya Sharma',
    role: 'Lead AI Scientist',
    initial: 'A',
    biography: "Ananya led the deep learning model validation team at Google Brain. Check out the courses they teach below.",
    teaches: ['Applied Machine Learning & AI'],
    courses: [
      { title: 'Applied Machine Learning & AI', desc: 'Build and deploy real-world machine learning systems.' }
    ]
  }
];

export default function EngineersPage() {
  const { id } = useParams<{ id?: string }>();

  // If a specific instructor ID is requested in URL path
  if (id) {
    const engineer = ENGINEERS.find((e) => e.id === id);

    if (!engineer) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center space-y-4">
          <h2 className="text-2xl font-bold heading-font">Instructor Not Found</h2>
          <Link to="/engineers" className="text-sm font-bold text-violet-500 hover:underline">
            &lt; Back to Engineers
          </Link>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen flex flex-col pt-24 dot-grid"
        style={{ background: 'transparent', color: 'var(--text-primary)' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-16 w-full z-10 space-y-12">
          {/* Back Nav */}
          <div>
            <Link
              to="/engineers"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              &lt; Back to Engineers
            </Link>
          </div>

          {/* Profile Header Grid */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Circle Initial */}
            <div
              className="w-36 h-36 rounded-full border-4 flex items-center justify-center text-5xl font-black heading-font select-none flex-shrink-0"
              style={{
                borderColor: 'var(--border-soft)',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
              }}
            >
              {engineer.initial}
            </div>

            {/* Basic Info */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold heading-font">
                {engineer.name}
              </h1>
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--accent-amber)' }}
              >
                {engineer.role}
              </p>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                {engineer.biography}
              </p>
            </div>
          </div>

          <div className="border-t opacity-30" style={{ borderColor: 'var(--border-soft)' }} />

          {/* Courses Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold heading-font">
              Courses by {engineer.name.split(' ')[0]}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engineer.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl glass card-hover flex flex-col justify-between min-h-[140px]"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {course.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Otherwise list all instructors (grid view)
  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 w-full z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="heading-font text-5xl md:text-6xl font-black">
            Meet the Top 7% Engineers
          </h1>
          <p className="text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Learn directly from industry veterans who have built products scaling to millions of users. No influencers, just real engineers.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ENGINEERS.map((engineer) => (
            <div
              key={engineer.id}
              className="rounded-[32px] overflow-hidden border flex flex-col justify-between min-h-[420px] transition-all duration-300 card-hover"
              style={{
                borderColor: 'var(--border-soft)',
                background: 'var(--bg-card)',
              }}
            >
              {/* Upper Visual */}
              <div
                className="h-44 flex items-center justify-center select-none"
                style={{
                  background: 'color-mix(in srgb, var(--bg-surface) 95%, white)',
                  borderBottom: '1px solid var(--border-soft)',
                }}
              >
                <div className="text-7xl font-extrabold tracking-tight opacity-40 heading-font" style={{ color: 'var(--text-secondary)' }}>
                  {engineer.initial}
                </div>
              </div>

              {/* Info Area */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold heading-font">{engineer.name}</h3>
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: 'var(--accent-amber)' }}
                    >
                      {engineer.role}
                    </p>
                  </div>

                  {/* Teaches lists */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                      Teaches:
                    </p>
                    <ul className="space-y-1 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      {engineer.teaches.map((topic, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span style={{ color: 'var(--accent-green)' }}>✓</span> {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Know more */}
                <div>
                  <Link
                    to={`/engineers/${engineer.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest hover:underline"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Know more &gt;&gt;&gt;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
