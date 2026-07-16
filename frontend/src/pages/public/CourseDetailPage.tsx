import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enrollInCourse } from '../../services/courses';

const COURSE_DETAILS: Record<string, any> = {
  "c1-uuid": {
    title: "UI/UX for Developers",
    level: "Intermediate",
    rating: 4.9,
    price: 149.99,
    bestseller: false,
    hot: false,
    new: false,
    students: "8,920",
    ratingsCount: "1,520",
    instructor: { name: "Sarah Jenkins", role: "Senior UX Architect", initial: "SJ", bio: "Former Lead Product Designer at Figma. Specializes in design systems, interaction patterns, and conversion optimization." },
    gradient: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
  },
  "c2-uuid": {
    title: "Full Stack React & Next.js",
    level: "Intermediate",
    rating: 4.9,
    price: 199.99,
    bestseller: false,
    hot: false,
    new: false,
    students: "14,230",
    ratingsCount: "3,110",
    instructor: { name: "Sarah Jenkins", role: "Senior Software Engineer", initial: "SJ", bio: "Veteran frontend engineer. Focuses on production scale React applications, server rendering architectures, and performance." },
    gradient: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
  },
  "c3-uuid": {
    title: "Full-Stack React & TypeScript",
    level: "Intermediate",
    rating: 4.9,
    price: 149,
    bestseller: true,
    hot: false,
    new: false,
    students: "12,480",
    ratingsCount: "2,401",
    instructor: { name: "Aisha Verma", role: "Senior Staff Engineer", initial: "AV", bio: "Former Principal Engineer at Vercel. I specialize in teaching complex architecture concepts by breaking them down into digestible, project-based steps." },
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  },
  "c4-uuid": {
    title: "System Design for Scale",
    level: "Advanced",
    rating: 4.8,
    price: 199,
    bestseller: false,
    hot: true,
    new: false,
    students: "11,800",
    ratingsCount: "2,150",
    instructor: { name: "Marcus Chen", role: "Principal Architect", initial: "MC", bio: "Designs high-scale backends. Formerly scaled AWS infrastructure layers." },
    gradient: "linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)",
  },
  "c5-uuid": {
    title: "Applied Machine Learning",
    level: "Advanced",
    rating: 4.9,
    price: 249,
    bestseller: false,
    hot: false,
    new: false,
    students: "6,420",
    ratingsCount: "980",
    instructor: { name: "Dr. Sarah Jenkins", role: "Lead AI Researcher", initial: "DSJ", bio: "Ph.D. in Computer Science. Researches deep learning applications in NLP and Vision." },
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
  },
  "c6-uuid": {
    title: "UI/UX Foundations for Devs",
    level: "Beginner",
    rating: 4.7,
    price: 99,
    bestseller: false,
    hot: false,
    new: true,
    students: "4,110",
    ratingsCount: "540",
    instructor: { name: "Priya Nair", initial: "PN", role: "Lead Designer", initial_display: "PN", bio: "Designs intuitive interfaces for startups and enterprises." },
    gradient: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
  }
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const course = COURSE_DETAILS[id || ""] || COURSE_DETAILS["c3-uuid"]; // Fallback to c3

  const handleEnroll = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (user.role !== 'STUDENT') {
      setActionMessage("Only student accounts can enroll in courses.");
      return;
    }

    try {
      await enrollInCourse(id || "c3-uuid");
      setActionMessage("Enrolled successfully! Redirecting to classroom...");
      setTimeout(() => {
        navigate(`/student/classroom/${id || "c3-uuid"}`);
      }, 1500);
    } catch {
      setActionMessage("Failed to enroll in this course.");
    }
  };

  const sections = [
    {
      title: "Getting Started with the Fundamentals",
      lessons: 8,
      duration: "2h 15m",
      items: [
        { title: "Lesson 1: Understanding the basics", duration: "12:45" },
        { title: "Lesson 2: Development Environment Setup", duration: "18:20" },
        { title: "Lesson 3: Core Syntax and Scaffolding", duration: "15:10" }
      ]
    },
    {
      title: "Building the Core Infrastructure",
      lessons: 12,
      duration: "5h 40m",
      items: [
        { title: "Lesson 4: Building the router layer", duration: "22:15" },
        { title: "Lesson 5: State management models", duration: "32:40" },
        { title: "Lesson 6: Database integration hooks", duration: "25:30" }
      ]
    },
    {
      title: "Advanced Patterns and Architecture",
      lessons: 14,
      duration: "6h 20m",
      items: [
        { title: "Lesson 7: Optimization techniques", duration: "28:15" },
        { title: "Lesson 8: Security controls and middleware", duration: "34:10" }
      ]
    },
    {
      title: "Deployment and CI/CD Pipeline",
      lessons: 8,
      duration: "4h 15m",
      items: [
        { title: "Lesson 9: Automated testing setups", duration: "19:45" },
        { title: "Lesson 10: Serverless pipeline configuration", duration: "27:12" }
      ]
    }
  ];

  return (
    <div
      className="min-h-screen flex flex-col pt-4 dot-grid pb-20"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full z-10 space-y-10">

        {/* Hero Section */}
        <div className="p-8 md:p-12 rounded-[32px] border relative overflow-hidden flex flex-col md:flex-row justify-between gap-8"
          style={{
            borderColor: 'var(--border-soft)',
            background: 'var(--bg-card)'
          }}
        >
          {/* Left Hero Details */}
          <div className="space-y-6 max-w-2xl relative z-10">
            <div className="flex gap-2">
              {course.bestseller && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-500 text-white">
                  Bestseller
                </span>
              )}
              {course.hot && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-rose-500 text-white">
                  Hot
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-white/10 border border-white/20 text-white">
                {course.level}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black heading-font leading-tight">
              {course.title}
            </h1>

            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Master the modern tech stack by building production-ready applications from scratch. Stop watching tutorials and start shipping real code.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                ★ {course.rating} <span className="opacity-80">({course.ratingsCount} ratings)</span>
              </span>
              <span>•</span>
              <span>{course.students} students</span>
              <span>•</span>
              <span>Last updated Jan 2026</span>
            </div>

            {actionMessage && (
              <div className="p-3 text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                {actionMessage}
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleEnroll}
                className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-purple-500 hover:scale-[1.02] transition-all duration-200 shadow-md"
              >
                Enroll Now — ₹{course.price}
              </button>
              <button className="px-6 py-3.5 rounded-xl text-xs font-bold border transition-all hover:bg-white/5 flex items-center gap-2"
                style={{ borderColor: 'var(--border-soft)' }}
              >
                <span>▷</span> Preview Course
              </button>
            </div>
          </div>

          {/* Right Video Box */}
          <div className="w-full md:w-80 h-48 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-soft flex-shrink-0 group cursor-pointer"
            style={{ background: 'var(--bg-surface)' }}
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80')` }}
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 flex flex-col items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                <span className="text-xl ml-1">▶</span>
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase">Preview this course</span>
              <span className="text-[10px] opacity-75">04:12</span>
            </div>
          </div>
        </div>

        {/* 2 Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left main content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* What you'll learn */}
            <div className="p-8 rounded-[32px] border space-y-6"
              style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
            >
              <h2 className="text-xl font-bold heading-font">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {[
                  "Build production-ready applications from scratch",
                  "Design scalable database schemas",
                  "Write comprehensive test suites",
                  "Implement authentication and authorization",
                  "Implement robust CI/CD pipelines",
                  "Master state management and data fetching",
                  "Deploy applications to serverless infrastructure",
                  "Optimize performance and SEO"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content Accordions */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold heading-font">Course Content</h2>
                <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                  4 sections • 42 lessons • 18h 30m total length
                </p>
              </div>

              <div className="space-y-3">
                {sections.map((sec, idx) => {
                  const isExpanded = expandedSection === idx;
                  return (
                    <div
                      key={idx}
                      className="border rounded-2xl overflow-hidden transition-all duration-200"
                      style={{
                        borderColor: 'var(--border-soft)',
                        background: 'var(--bg-card)'
                      }}
                    >
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : idx)}
                        className="w-full p-5 flex justify-between items-center text-left font-bold text-xs hover:bg-white/5 transition-all"
                      >
                        <div className="space-y-1">
                          <span className="heading-font text-sm">{sec.title}</span>
                          <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                            {sec.lessons} lessons • {sec.duration}
                          </div>
                        </div>
                        <span className="text-base transform transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          ▼
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="p-5 border-t space-y-3" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface)' }}>
                          {sec.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-xs font-semibold">
                              <div className="flex items-center gap-2.5">
                                <span className="text-zinc-500">⚙</span>
                                <span>{item.title}</span>
                              </div>
                              <span className="text-[10px] font-bold" style={{ color: 'var(--text-tertiary)' }}>
                                {item.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right rail columns */}
          <div className="space-y-8">
            
            {/* Your Instructor Card */}
            <div className="p-8 rounded-[32px] border space-y-6"
              style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                Your Instructor
              </h3>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border bg-zinc-800 text-zinc-300 border-zinc-700">
                  {course.instructor.initial}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-sm">{course.instructor.name}</h4>
                  <p className="text-[10px] font-bold" style={{ color: 'var(--text-tertiary)' }}>{course.instructor.role}</p>
                  <Link to="/engineers" className="text-[9px] font-bold text-indigo-400 hover:underline block pt-0.5">
                    View Profile &gt;
                  </Link>
                </div>
              </div>

              <div className="flex gap-6 border-y py-4 text-xs font-semibold" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}>
                <div className="space-y-1">
                  <div className="text-amber-500 font-bold flex items-center gap-0.5">★ {course.rating}</div>
                  <div className="text-[9px] font-bold" style={{ color: 'var(--text-tertiary)' }}>Rating</div>
                </div>
                <div className="space-y-1">
                  <div className="font-extrabold text-zinc-200">{course.students}</div>
                  <div className="text-[9px] font-bold" style={{ color: 'var(--text-tertiary)' }}>Students</div>
                </div>
              </div>

              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {course.instructor.bio}
              </p>
            </div>

            {/* Requirements Card */}
            <div className="p-8 rounded-[32px] border space-y-4"
              style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                Requirements
              </h3>
              <ul className="space-y-2 text-xs font-semibold list-disc list-inside" style={{ color: 'var(--text-secondary)' }}>
                <li>Basic understanding of JavaScript and React</li>
                <li>Node.js installed on your machine</li>
                <li>A passion for building real products</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
