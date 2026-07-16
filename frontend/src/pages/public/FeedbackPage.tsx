import { useState } from 'react';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col pt-24 dot-grid pb-20 justify-center items-center"
        style={{ background: 'transparent', color: 'var(--text-primary)' }}
      >
        <div
          className="rounded-[32px] p-8 border shadow-xl max-w-md w-full text-center space-y-4"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            ✓
          </div>
          <h2 className="text-2xl font-black heading-font">Thank You!</h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Your feedback has been submitted successfully. We appreciate your help in making CodersSpot better!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid pb-20"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      <section className="relative py-16 px-6 max-w-4xl mx-auto space-y-6 text-center w-full overflow-hidden">
        <h1 className="text-5xl font-extrabold tracking-tight heading-font">
          Your Feedback Matters
        </h1>
        <p
          className="text-base font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Help us improve the platform.
        </p>
      </section>

      {/* Feedback Form Card */}
      <section className="px-6 max-w-2xl mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] p-8 border shadow-xl flex flex-col space-y-6"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-soft)',
          }}
        >
          {/* Stars container */}
          <div className="text-center space-y-4">
            <h3 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
              Rate your overall experience
            </h3>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform duration-150 hover:scale-110"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill={(hoverRating || rating) >= star ? '#FBBF24' : 'none'}
                    stroke={(hoverRating || rating) >= star ? '#FBBF24' : 'var(--text-tertiary)'}
                    strokeWidth={2}
                    className="cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.178 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.772-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Comment text area */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>
              What could we improve?
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you liked or what needs work..."
              rows={5}
              className="w-full p-4 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
              style={{
                background: 'var(--bg-base)',
                borderColor: 'var(--border-soft)',
                color: 'var(--text-primary)',
              }}
              required
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={rating === 0}
              className="px-8 py-3 rounded-xl text-sm font-black transition-all duration-200 select-none shadow-md"
              style={{
                background: rating === 0 ? 'var(--border-soft)' : 'var(--bg-base)',
                borderColor: 'var(--border-soft)',
                color: rating === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                borderWidth: '1px',
                cursor: rating === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
