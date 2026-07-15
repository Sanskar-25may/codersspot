import { useState, useEffect } from 'react';
import { getPageContent } from '../../services/cms';

export default function CommunityPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getPageContent('community')
      .then((data) => setContent(data))
      .catch(() => {});
  }, []);

  const features = content?.features || [
    {
      title: "Private Discord Server",
      description: "Get 24/7 access to our private Discord where students, alumni, and faculty hang out and talk tech.",
      icon: "💬"
    },
    {
      title: "Code Reviews",
      description: "Drop your PRs in the review channel and get feedback from top 1% engineers before you merge.",
      icon: "👀"
    },
    {
      title: "Mock Interviews",
      description: "Practice your system design and DSA skills with peers who are also interviewing at FAANG.",
      icon: "🎤"
    }
  ];

  const members = content?.members || [
    "Frontend Developers", "Backend Engineers", "Full-Stack Devs", "System Architects", "Product Managers"
  ];

  // The link to the actual community server (Discord or similar developer community link)
  const joinLink = content?.joinLink || "https://discord.gg/codersspot"; 

  return (
    <div
      className="min-h-screen flex flex-col pt-24 dot-grid"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20 w-full z-10 space-y-16">
        
        {/* Hero Area */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-soft)',
              color: 'var(--accent-green)',
            }}
          >
            <span className="pulse-dot flex-shrink-0" />
            1,204 Members Online
          </div>
          
          <h1 className="heading-font text-5xl md:text-6xl font-black">
            Join the Developer Network
          </h1>
          
          <p className="text-base md:text-lg font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Your network is your net worth. Connect with thousands of ambitious engineers building the next generation of software.
          </p>

          <div className="pt-4">
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02] transition-all duration-200 shadow-lg inline-flex items-center gap-3"
            >
              Join the Community
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature: any, idx: number) => (
            <div
              key={idx}
              className="p-8 rounded-[32px] glass card-hover flex flex-col justify-between min-h-[220px]"
            >
              <div className="space-y-4">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="heading-font text-2xl font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Who you'll meet marquee section */}
        <div className="text-center space-y-8 pt-8">
          <h2 className="heading-font text-3xl font-bold">Who you'll meet</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {members.map((member: string, i: number) => (
              <span
                key={i}
                className="px-6 py-3 rounded-full text-xs font-bold border card-hover mono-font"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-soft)',
                  color: 'var(--text-secondary)'
                }}
              >
                {member}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
