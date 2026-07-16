import { useState } from 'react';

export default function InsightsPage() {
  const [likes, setLikes] = useState(1);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid pb-20"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      <section className="relative py-16 px-6 max-w-4xl mx-auto space-y-6 text-center w-full overflow-hidden">
        <h1 className="text-5xl font-extrabold tracking-tight heading-font">
          Platform Insights
        </h1>
        <p
          className="text-base font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Stay up-to-date with the latest content, blogs, and course posters.
        </p>
      </section>

      {/* Main post container */}
      <section className="px-6 max-w-3xl mx-auto w-full">
        <div
          className="rounded-[32px] overflow-hidden border shadow-xl transition-all duration-300"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-soft)',
          }}
        >
          {/* Post Image Banner */}
          <div className="h-[400px] w-full overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80" 
              alt="Welcome to the New Insights Feed!" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Details & Body */}
          <div className="p-8 space-y-6">
            
            {/* Author Profile */}
            <div className="flex items-center gap-3.5">
              {/* Avatar circle */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white bg-pink-600 shadow-md">
                S
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>Super Admin</h4>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                  2026-07-10T03:49:50.473Z
                </p>
              </div>
            </div>

            {/* Post Typography */}
            <div className="space-y-3">
              <h2 className="text-2xl font-black heading-font" style={{ color: 'var(--text-primary)' }}>
                Welcome to the New Insights Feed!
              </h2>
              <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We have completely revamped our Insights engine. It is now powered by normalized PostgreSQL tables for blazing fast performance and infinite scalability. Feel free to like or comment below!
              </p>
            </div>

            {/* Like and comment controls row */}
            <div className="pt-5 border-t flex items-center gap-6" style={{ borderColor: 'var(--border-soft)' }}>
              
              {/* Like action trigger */}
              <button 
                onClick={handleLike}
                className="flex items-center gap-2 text-xs font-bold transition-colors duration-150 hover:opacity-85"
                style={{ color: hasLiked ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
              >
                <svg 
                  width="16" 
                  height="16" 
                  fill={hasLiked ? 'currentColor' : 'none'} 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likes}</span>
              </button>

              {/* Comment metrics */}
              <div 
                className="flex items-center gap-2 text-xs font-bold"
                style={{ color: 'var(--text-secondary)' }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>0 Comments</span>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
