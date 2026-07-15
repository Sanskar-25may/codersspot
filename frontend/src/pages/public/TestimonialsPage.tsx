const REVIEWS = [
  {
    name: 'Rohan Deshmukh',
    role: 'Frontend Dev @ Razorpay',
    text: 'The project-based learning model helped me build actual confidence. I got a job offer within 3 weeks of graduating.',
    initial: 'R',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    name: 'Priya Nair',
    role: 'Data Engineer @ Google',
    text: 'Outstanding curriculum quality. The peer cohort reviews made me understand what clean code really means.',
    initial: 'P',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Aman Verma',
    role: 'DevOps Engineer @ Amazon',
    text: 'Highly practical. Setting up CI/CD pipelines in the classroom was the game changer.',
    initial: 'A',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    name: 'Sneha Patel',
    role: 'Full Stack Dev @ Flipkart',
    text: 'The mentors genuinely care about your growth. I had 1-on-1 sessions every week that were incredibly valuable.',
    initial: 'S',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Arjun Rao',
    role: 'Backend Engineer @ Cred',
    text: 'The system design module alone was worth the entire fee. I cleared 5 FAANG interviews back-to-back.',
    initial: 'A',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Divya Singh',
    role: 'ML Engineer @ Meta',
    text: "I was skeptical at first, but the quality of instruction exceeded everything I'd seen on Udemy or Coursera.",
    initial: 'D',
    color: 'from-purple-500 to-violet-500',
  },
];

export default function TestimonialsPage() {
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
          ⭐ Student Stories
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight heading-font">
          Hear from our <span className="shimmer-text">students</span>
        </h1>
        <p
          className="text-base font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Over 10,000 developers have upgraded their careers with CodersSpot.
        </p>
      </section>

      {/* ── RATING BANNER ── */}
      <section
        className="py-12 px-6 border-y"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-lg mx-auto flex flex-col items-center gap-3 text-center">
          <div className="text-7xl font-extrabold heading-font bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
            4.9
          </div>
          <div className="text-amber-400 text-2xl font-bold tracking-widest">★★★★★</div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Based on 2,400+ reviews from verified students.
          </p>
        </div>
      </section>

      {/* ── REVIEWS GRID ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass card-hover flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="text-amber-400 font-bold text-base">★★★★★</div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: 'var(--border-soft)' }}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br ${review.color} flex-shrink-0`}
                >
                  {review.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{review.name}</h4>
                  <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    {review.role}
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
