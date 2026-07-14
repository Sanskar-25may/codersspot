import { useState, useEffect } from 'react';
import { getPageContent } from '../../services/cms';

export default function TestimonialsPage() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPageContent('testimonials')
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

  const testimonialData = content || {
    headline: "Stories from our active graduates",
    reviews: []
  };

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* 1. HERO SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)', color: 'var(--accent-primary)' }}>
          ⭐ Student Achievements
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight heading-font">
          {testimonialData.headline}
        </h1>
      </section>

      {/* 2. REVIEWS LIST */}
      {testimonialData.reviews && testimonialData.reviews.length > 0 && (
        <section className="py-12 px-6 max-w-6xl mx-auto w-full flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialData.reviews.map((review: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl glass card-hover flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex text-amber-400 font-bold text-sm">
                    {"★".repeat(review.stars || 5)}
                  </div>
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center font-bold text-xs" style={{ color: 'var(--accent-cyan)' }}>
                    {review.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{review.name}</h4>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
